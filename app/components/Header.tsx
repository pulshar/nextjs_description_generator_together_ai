import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggleButton } from "./theme/ThemeToggleButton";


export default function Header() {
  return (
    <header className="text-sm font-medium">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 justify-center lg:justify-end">
        

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link href="https://github.com/pulshar/nextjs_description_generator_together_ai">
                <Github className="h-5 w-5" />
                <span className="sr-only">Github link</span>
              </Link>
            </Button>

            <ThemeToggleButton />
          </div>
      </div>
    </header>
  );
}
