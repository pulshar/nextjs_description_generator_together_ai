"use client";

import Spinner from "@/app/components/spinner";
import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "./ImageUploader";
import LanguageSelector from "./LanguageSelector";
import LengthSelector from "./LengthSelector";
import ModelSelector from "./ModelSelector";

export default function CardForm() {
  const image = useDescriptionStore((state) => state.image);
  const status = useDescriptionStore((state) => state.status);
  const selectedLanguages = useDescriptionStore(
    (state) => state.selectedLanguages,
  );
  const descriptions = useDescriptionStore((state) => state.descriptions);

  const { handleResetApp, handleSubmit } = useDescriptionStore();

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
          {descriptions.length === 0 ? (
            <Button
              type="submit"
              disabled={
                !image || selectedLanguages.length === 0 || status === "loading"
              }
              className="relative w-full xs:w-auto"
            >
              <span
                className={status === "loading" ? "opacity-0" : "opacity-100"}
              >
                Generate descriptions
              </span>

              {status === "loading" && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <Spinner className="size-4" />
                </span>
              )}
            </Button>
          ) : (
            <Button className="w-full xs:w-auto" onClick={handleResetApp}>
              Reset App
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
