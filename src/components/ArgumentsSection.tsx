import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const arguments_ = [
  {
    title: "Argument 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    title: "Argument 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.",
  },
  {
    title: "Argument 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum.",
  },
];

const ArgumentsSection = () => {
  return (
    <section className="pb-20 pt-4 px-4">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Dlaczego tak będzie lepiej?
        </h2>
        <Accordion type="multiple" className="space-y-2">
          {arguments_.map((arg, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-xl px-4 bg-card"
            >
              <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
                {arg.title}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {arg.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ArgumentsSection;
