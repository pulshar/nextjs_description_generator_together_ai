import useDescriptionStore from "@/app/hooks/useDescriptionStore";
import { Button } from "@/components/ui/button";
import Spinner from "../spinner";

export default function Buttons() {
  const image = useDescriptionStore((state) => state.image);
  const status = useDescriptionStore((state) => state.status);
  const selectedLanguages = useDescriptionStore(
    (state) => state.selectedLanguages,
  );
  const descriptions = useDescriptionStore((state) => state.descriptions);

  const handleResetApp = useDescriptionStore((state) => state.handleResetApp);

  if (descriptions.length === 0) return (
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
  )

  return (

      <Button className="w-full xs:w-auto" onClick={handleResetApp}>
        Reset App
      </Button>
  )
}