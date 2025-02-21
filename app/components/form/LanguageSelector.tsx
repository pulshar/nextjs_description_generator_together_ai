import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { languages } from "@/lib/constants";

export default function LanguageSelector() {

    const  selectedLanguages  = useDescriptionStore((state) => (state.selectedLanguages));
    const  setSelectedLanguages  = useDescriptionStore((state) => (state.setSelectedLanguages));

  return (
    <div className="grid grid-cols-1 gap-4 px-2 py-7 xs:grid-cols-[45%_auto]">
      <div>
        <p className="text-sm font-bold">Languages</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose up to 3 languages for the product descriptions.
        </p>
      </div>
      <ToggleGroup
        type="multiple"
        className="flex flex-wrap justify-start gap-2 xs:justify-end"
        onValueChange={setSelectedLanguages}
      >
        {languages.map((lang) => (
          <ToggleGroupItem
            variant="outline"
            key={lang.value}
            value={lang.value}
            disabled={
              selectedLanguages.length === 3 &&
              !selectedLanguages.includes(lang.value)
            }
            className="rounded-full text-xs font-medium shadow-none data-[state=on]:bg-foreground data-[state=on]:text-background"
          >
            {lang.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
