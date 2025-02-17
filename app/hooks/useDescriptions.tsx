import { lengths, models } from "@/lib/constants";
import { Description, Status } from "@/lib/types";
import { useCallback, useState } from "react";

export function useDescriptions() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<Description[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [model, setModel] = useState(models[0].value);
  const [length, setLength] = useState(lengths[0].value);

  const handleResetApp = useCallback(() => {
    setImage(null);
    setDescriptions([]);
    setStatus("idle");
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!image || selectedLanguages.length === 0) return;

      setStatus("loading");

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

      setDescriptions(descriptions);
      setStatus("success");
    },
    [image, selectedLanguages, model, length],
  );

  return {
    image,
    status,
    model,
    selectedLanguages,
    length,
    descriptions,
    setImage,
    setModel,
    setSelectedLanguages,
    setLength,
    handleResetApp,
    handleSubmit,
  };
}
