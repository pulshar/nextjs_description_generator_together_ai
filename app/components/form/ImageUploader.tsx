/* eslint-disable @next/next/no-img-element */

import Spinner from "@/app/components/spinner";
import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const image = useDescriptionStore((state) => state.image);
  const setImage = useDescriptionStore((state) => state.setImage);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [setImage],
  );

  return (
    <>
      <div
        className={`${image ? "border-transparent bg-transparent" : "transition-colors hover:border-brand"} my-4 flex aspect-[2/1] flex-col items-center justify-center rounded-md border-2 border-dashed bg-muted md:aspect-[2.5/1]`}
      >
        {image ? (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border bg-muted">
            <img
              src={image}
              alt="Uploaded product"
              className="w-full object-cover"
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
                <Spinner className="size-6 opacity-25" />
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
          onClick={(e) => {
            e.preventDefault();
            setImage(
              "https://res.cloudinary.com/dfcv0exad/image/upload/v1739440780/next-cloudinary-uploads/upload_1739440780559_product-sample_pfg4nl.jpg",
            );
          }}
          className="px-2 text-xs font-semibold text-brand hover:underline"
        >
          Use a sample image
        </button>
      </div>
    </>
  );
}
