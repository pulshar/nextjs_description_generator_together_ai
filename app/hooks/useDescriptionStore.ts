import { lengths, models } from "@/lib/constants";
import { Description, Status } from "@/lib/types";
import { create } from "zustand";

type DescriptionState = {
  image: string | null;
  status: Status;
  model: string;
  selectedLanguages: string[];
  length: string;
  descriptions: Description[];
  error?: string | null;
};

type DescriptionActions = {
  setImage: (image: string | null) => void;
  setModel: (model: string) => void;
  setSelectedLanguages: (selectedLanguages: string[]) => void;
  setLength: (length: string) => void;
  handleResetApp: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const initialState: DescriptionState = {
  image: null,
  status: "idle",
  model: models[0].value,
  selectedLanguages: [],
  length: lengths[0].value,
  descriptions: [],
};

const useDescriptionStore = create<DescriptionState & DescriptionActions>()(
  (set) => ({
    ...initialState,
    setImage: (image) => set({ image }),
    setModel: (model) => set({ model }),
    setSelectedLanguages: (selectedLanguages: string[]) =>
      set({ selectedLanguages }),
    setLength: (length) => set({ length }),

    handleResetApp: () => set(initialState),

    handleSubmit: async (e) => {
      e.preventDefault();

      const { image, selectedLanguages, length, model } =
        useDescriptionStore.getState();
      
      if (!image || selectedLanguages.length === 0) return;

      set({ status: "loading", error: null });

      try {
        const response = await fetch("/api/generateDescriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            languages: selectedLanguages,
            imageUrl: image,
            model,
            length,
          }),
        });

        // Error HTTP (4xx / 5xx)
        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(
            errorBody?.message || `Service currently unavailable`,
          );
        }


        const descriptions = await response.json();

        set({
          descriptions,
          status: "success",
        });
      } catch (error) {
        set({
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Unexpected error occurred",
        });
      }
    },
  }),
);

export default useDescriptionStore;
