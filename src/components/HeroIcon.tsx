import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import storyPizza from "@/assets/pizza-story.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HeroIconPage = () => {
  return (
    <section className="overflow-hidden bg-background py-16 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Pizza image: padding gives breathing room inside a thin outer ring */}
        <div className="relative mx-auto aspect-square w-full max-w-lg rounded-full border border-dashed border-border p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-12 rounded-full bg-orange-200/50 blur-3xl"
          />
          <div className="relative size-full">
            <Image
              src={storyPizza}
              alt="A freshly baked pizza topped with mozzarella, olives and basil"
              fill
              loading="eager"
              className="rounded-full object-cover shadow-2xl ring-8 ring-background"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="max-w-xl space-y-5">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">
            Our Story
          </Badge>

          <h2 className="pt-5 text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl lg:leading-[1.1]">
            Excellent quality food, made with care
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
            Every PizzaHub pizza begins with dough that rests for 48 hours, then
            gets topped with slow-simmered tomato sauce, fresh mozzarella and
            ingredients we would happily serve at our own table. From the first
            slice to the last, it is the little details that make the
            difference.
          </p>

          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/menu" />}
          >
            Read more
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroIconPage;