"use client";

import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { Card } from "@/components/ui/card";
import Buttons from "./Buttons";
import ImageUploader from "./ImageUploader";
import LanguageSelector from "./LanguageSelector";
import LengthSelector from "./LengthSelector";
import ModelSelector from "./ModelSelector";

export default function CardForm() {
  const status = useDescriptionStore((state) => state.status);
  const handleSubmit = useDescriptionStore((state) => state.handleSubmit);
  return (
    <Card className="mx-auto w-full max-w-xl p-6">
      <h2 className="mb-1 text-2xl font-bold">Product Description Generator</h2>
      <p className="mb-6 text-balance text-sm text-muted-foreground">
        Upload an image of your product to generate descriptions in multiple
        languages.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={status === "loading"}>
          <ImageUploader />

          <div className="divide-y">
            <ModelSelector />
            <LanguageSelector />
            <LengthSelector />
          </div>
        </fieldset>
        <div className="mt-10 text-right">
          <Buttons />
        </div>
      </form>
    </Card>
  );
}
