import { Closing } from "@/components/Closing";
import { Countdown } from "@/components/Countdown";
import { Details } from "@/components/Details";
import { FallingRoses } from "@/components/FallingRoses";
import { Hero } from "@/components/Hero";
import { Providers } from "@/components/Providers";

export default function Home() {
  return (
    <Providers>
      <div className="backdrop" />
      <FallingRoses />
      <main className="page">
        <Hero />
        <Countdown />
        <Details />
        <Closing />
      </main>
      <FallingRoses front />
    </Providers>
  );
}
