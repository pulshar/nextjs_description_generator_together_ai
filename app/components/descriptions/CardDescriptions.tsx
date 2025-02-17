"use client";

import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { languages } from "@/lib/constants";

export default function CardDescriptions() {
  const status = useDescriptionStore((state) => state.status);
  const selectedLanguages = useDescriptionStore(
    (state) => state.selectedLanguages,
  );
  const length = useDescriptionStore((state) => state.length);
  const descriptions = useDescriptionStore((state) => state.descriptions);

  return status === "idle" ? (
    <div className="mx-auto flex h-64 w-full max-w-xl flex-col items-center justify-center rounded-xl border bg-muted p-6 lg:h-auto">
      <p className="text-center text-xl text-muted-foreground">
        See your generated descriptions here
      </p>
    </div>
  ) : (
    <Card className="mx-auto w-full max-w-xl p-6">
      <h3 className="text-xl font-semibold">Generated Descriptions</h3>
      {status === "loading" ? (
        <div className="mt-6 space-y-10">
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
        <div className="divide-y">
          {descriptions.map(({ language, description }) => (
            <div key={language} className="py-5">
              <h4 className="font-medium">
                {languages.find((l) => l.value === language)?.label}
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
