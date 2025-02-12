/* eslint-disable @next/next/no-img-element */
"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlertCircleIcon, Upload, X } from "lucide-react";
import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "pt", name: "Portuguese" },
];

const models = [
  {
    value: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
    label: "Llama 3.2 11B",
  },
  {
    value: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
    label: "Llama 3.2 90B",
  },
];

const lengths = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<
    { language: string; description: string }[]
  >([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [model, setModel] = useState(models[0].value);
  const [length, setLength] = useState(lengths[0].value);

  const handleResetApp = () => {
    setImage(null);
    setDescriptions([]);
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/cloudinary-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImage(data.imageUrl);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async () => {
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
  };

  return (
    <div className="mx-auto my-12 grid max-w-6xl grid-cols-1 gap-8 px-4 lg:grid-cols-2">
      <Card className="mx-auto w-full max-w-xl p-6">
        <h2 className="mb-1 text-2xl font-bold">
          Product Description Generator
        </h2>
        <p className="mb-6 text-balance text-sm text-muted-foreground">
          Upload an image of your product to generate descriptions in multiple
          languages.
        </p>
        <div>
          <div
            className={`${image ? "border-transparent bg-transparent" : "transition-colors hover:border-brand"} my-4 flex aspect-[3] flex-col items-center justify-center rounded-md border-2 border-dashed bg-muted`}
          >
            {image ? (
              <div className="relative flex h-full max-h-full w-full items-center justify-center rounded-md border bg-muted p-3">
                <img
                  src={image}
                  alt="Uploaded product"
                  className="h-full rounded-md"
                />
                <Button
                  variant="default"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7 rounded-full"
                  onClick={() => setImage(null)}
                >
                  <X />
                </Button>
              </div>
            ) : (
              <Label
                htmlFor="image-upload"
                className="flex w-full grow cursor-pointer items-center justify-center"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Spinner className="size-6" />
                    <span className="text-muted-foreground opacity-65">
                      Uploading image
                    </span>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center gap-2 text-destructive">
                    <AlertCircleIcon className="h-8 w-8" />
                    <span>{error}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8" />
                    <span>Upload product image</span>
                  </div>
                )}

                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Label>
            )}
          </div>
          <div className={`${image ? "invisible" : ""} text-right`}>
            <button
              onClick={() =>
                setImage(
                  "https://res.cloudinary.com/dfcv0exad/image/upload/v1739276240/next-cloudinary-uploads/upload_1739276254940_product_hdt9bo.jpg",
                )
              }
              className="px-2 text-xs font-semibold text-brand hover:underline"
            >
              Use a sample image
            </button>
          </div>

          <div className="divide-y">
            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 px-2 py-7">
              <div>
                <p className="text-sm font-bold">Model</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select the Llama 3.2 vision model you want to use.
                </p>
              </div>
              <ToggleGroup
                type="single"
                className="xs:justify-end flex flex-wrap justify-start gap-2"
                onValueChange={setModel}
                value={model}
              >
                {models.map((model) => (
                  <ToggleGroupItem
                    variant="outline"
                    key={model.value}
                    value={model.value}
                    className="rounded-full text-xs font-medium shadow-none data-[state=on]:bg-foreground data-[state=on]:text-background"
                  >
                    {model.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 px-2 py-7">
              <div>
                <p className="text-sm font-bold">Languages</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose up to 3 languages for the product descriptions.
                </p>
              </div>
              <ToggleGroup
                type="multiple"
                className="xs:justify-end flex flex-wrap justify-start gap-2"
                onValueChange={setSelectedLanguages}
              >
                {languages.map((lang) => (
                  <ToggleGroupItem
                    variant="outline"
                    key={lang.code}
                    value={lang.code}
                    disabled={
                      selectedLanguages.length === 3 &&
                      !selectedLanguages.includes(lang.code)
                    }
                    className="rounded-full px-3 py-1 text-xs font-medium shadow-none data-[state=on]:bg-black data-[state=on]:text-white"
                  >
                    {lang.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 px-2 pt-7">
              <div>
                <p className="text-sm font-bold">Length</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select the length of the product descriptions.
                </p>
              </div>
              <ToggleGroup
                type="single"
                className="xs:justify-end flex flex-wrap justify-start gap-2"
                onValueChange={setLength}
                value={length}
              >
                {lengths.map((model) => (
                  <ToggleGroupItem
                    variant="outline"
                    key={model.value}
                    value={model.value}
                    className="rounded-full px-3 py-1 text-xs font-medium shadow-none data-[state=on]:bg-black data-[state=on]:text-white"
                  >
                    {model.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          <div className="mt-10 text-right">
            {descriptions.length === 0 ? (
              <Button
                onClick={handleSubmit}
                disabled={
                  !image ||
                  selectedLanguages.length === 0 ||
                  status === "loading"
                }
                className="xs:w-auto relative w-full"
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
              <Button onClick={handleResetApp}>Reset app</Button>
            )}
          </div>
        </div>
      </Card>

      {status === "idle" ? (
        <div className="mx-auto flex h-64 w-full max-w-xl flex-col items-center justify-center rounded-xl bg-muted p-6 lg:h-auto">
          <p className="text-center text-xl text-muted-foreground">
            See your generated descriptions here
          </p>
        </div>
      ) : (
        <Card className="mx-auto w-full max-w-xl p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Generated Descriptions</h3>
            {status === "loading" ? (
              <div className="space-y-8">
                {selectedLanguages.map((language) => (
                  <div className="flex flex-col space-y-3" key={language}>
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton
                      className={`${
                        length === "short"
                          ? "h-12"
                          : length === "medium"
                            ? "h-20"
                            : "h-32"
                      }`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {descriptions.map(({ language, description }) => (
                  <div key={language}>
                    <h4 className="font-medium">
                      {languages.find((l) => l.code === language)?.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
