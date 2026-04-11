import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ArgumentsSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="pb-12 pt-2 px-4">
      <div className="max-w-xl mx-auto">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
            Przeczytaj uzasadnienie
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="bg-card border border-border rounded-xl p-5 text-xs md:text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong className="text-foreground">Argument 1.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                <strong className="text-foreground">Argument 2.</strong> Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula.
              </p>
              <p>
                <strong className="text-foreground">Argument 3.</strong> Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum. Integer posuere erat a ante venenatis dapibus.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default ArgumentsSection;
