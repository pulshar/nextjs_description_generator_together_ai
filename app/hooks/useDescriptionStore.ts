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
  setImage: (image: string | null) => void;
  setModel: (model: string) => void;
  setSelectedLanguages: (selectedLanguages: string[]) => void;
  setLength: (length: string) => void;
  handleResetApp: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useDescriptionStore = create<DescriptionState>()((set) => ({
  image: null,
  status: "idle",
  model: models[0].value,
  selectedLanguages: [],
  length: lengths[0].value,
  descriptions: [],

  setImage: (image) => set({ image }),
  setModel: (model) => set({ model }),
  setSelectedLanguages: (selectedLanguages: string[]) =>
    set({ selectedLanguages }),
  setLength: (length) => set({ length }),

  handleResetApp: () =>
    set({
      image: null,
      status: "idle",
      model: models[0].value,
      selectedLanguages: [],
      length: lengths[0].value,
      descriptions: [],
    }),

  handleSubmit: async (e) => {
    e.preventDefault();
    const { image, selectedLanguages, length, model } =
      useDescriptionStore.getState();
    if (!image || selectedLanguages.length === 0) return;
    set({ status: "loading" });

    const response = await fetch("/api/generateDescriptions", {
      method: "POST",
      body: JSON.stringify({
        languages: selectedLanguages,
        imageUrl: image,
        model,
        length,
      }),
    });

    const descriptions = await response.json();
    set({ descriptions: descriptions });
    set({ status: "success" });
  },
}));

export default useDescriptionStore;
