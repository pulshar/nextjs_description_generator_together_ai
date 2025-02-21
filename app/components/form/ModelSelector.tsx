import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { models } from "@/lib/constants";

export default function ModelSelector() {
  const model = useDescriptionStore((state) => state.model);
  const setModel = useDescriptionStore((state) => state.setModel);

  return (
    <div className="grid grid-cols-1 gap-4 px-2 py-7 xs:grid-cols-2">
      <div>
        <p className="text-sm font-bold">Model</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Select the Llama 3.2 vision model you want to use.
        </p>
      </div>
      <ToggleGroup
        type="single"
        className="flex flex-wrap justify-start gap-2 xs:justify-end"
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
  );
}
