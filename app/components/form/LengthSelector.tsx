import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { lengths } from "@/lib/constants";

export default function LengthSelector() {
  const length = useDescriptionStore((state) => state.length);
  const setLength = useDescriptionStore((state) => state.setLength);
  return (
    <div className="grid grid-cols-1 gap-4 px-2 pt-7 xs:grid-cols-2">
      <div>
        <p className="text-sm font-bold">Length</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Select the length of the product descriptions.
        </p>
      </div>
      <ToggleGroup
        type="single"
        className="flex flex-wrap justify-start gap-2 xs:justify-end"
        onValueChange={setLength}
        value={length}
      >
        {lengths.map((model) => (
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
  );
}
