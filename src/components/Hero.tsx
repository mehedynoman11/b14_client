import { Clock, Flame, Pizza, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import heroPizza from "@/assets/pizza-hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-orange-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-orange-200/50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div className="max-w-xl space-y-4">
          <Badge
            variant="outline"
            className="border-orange-200 bg-white/70 text-orange-700"
          >
            <Pizza className="text-orange-500 font-bold" />
            Handmade in small batches
          </Badge>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Handmade, with an extra pinch of{" "}
            <span className="text-red-500">love</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Fresh dough, slow-risen for 48 hours, topped with ingredients we
            would happily serve at our own table.
          </p>

          {/* <Button
            variant="destructive"
            className="mt-8 gap-2 rounded-2xl bg-red-400 p-8 text-base text-white"
            nativeButton={false}
            render={<Link href="/menu" />}
          >
            <ShoppingCart />
            Order now
          </Button> */}
          <Button 
            nativeButton={false}
        
          render={<Link href="/menu" />}>
            <ShoppingCart/>
            Order Now
          </Button>

          
        </div>

        {/* Pizza image with a floating rating card */}
        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-orange-300/60 blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
            <Image
              src={heroPizza}
              alt="A freshly baked pizza topped with tomatoes, olives and cheese"
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
            <span className="flex size-10 items-center justify-center rounded-full bg-orange-100">
              <Star className="size-5 fill-orange-500 text-orange-500" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">4.9 out of 5</p>
              <p className="text-xs text-muted-foreground">
                2,400+ happy customers
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
