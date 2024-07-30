"use client";
import Marquee from "@/components/magicui/marquee";
import { usePokemons } from "@/contexts/PokemonContext";
import { useEffect } from "react";
import PulsatingButton from "./pulsating-button";
import { useRouter } from "next/navigation";

export default function Pokemon3DList() {
  const router = useRouter();
  const { pokemonHeaderData, setPokemonHeaderData } = usePokemons();
  useEffect(() => {
    (async function () {
      const pokeHeaderData = await fetch("/api/getPokemonHeader", {
        method: "GET",
      }).then((res) => res.json());
      setPokemonHeaderData(pokeHeaderData);
    })();
  }, []);
  
  return (
    <div className="flex flex-row ">
      <div className=" mr-2">
        <div className="relative flex h-full w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-background px-20 md:shadow-xl mr-2">
          <div className="flex flex-row gap-4 [perspective:500px]">
            <Marquee
              className="h-48 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
              vertical
              style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
              }}
            >
              {pokemonHeaderData.bluePokemonImages.length &&
                pokemonHeaderData.bluePokemonImages.map((data, idx) => (
                  <img
                    key={idx}
                    src={data.img}
                    alt={data.name}
                    style={{ transform: "scale(1)" }}
                    className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
                  />
                ))}
            </Marquee>
          </div>
        </div>
        <PulsatingButton pulseColor="#3361A5" className="bg-[#3361A5] mx-auto">
          Blue Pokemons
        </PulsatingButton>
        {/* <ShinyButton text="Blue Pokemons" color="#3361A5" shineColor="rgb(51, 97, 165)" /> */}
      </div>

      <div className=" mr-2">
        <div className="relative flex h-full w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-background px-20 md:shadow-xl">
          <div className="flex flex-row gap-4 [perspective:300px]">
            <Marquee
              className="h-48 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
              vertical
              style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
              }}
            >
              {pokemonHeaderData.redPokemonImages.length &&
                pokemonHeaderData.redPokemonImages.map((data, idx) => (
                  <img
                    key={idx}
                    src={data.img}
                    alt={data.name}
                    style={{ transform: "scale(1)" }}
                    className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
                  />
                ))}
            </Marquee>
          </div>
        </div>
        <PulsatingButton onClick={() => router.push('/pokemon/red')} pulseColor="#EF5350" className="bg-[#EF5350] mx-auto">
          Red Pokemons
        </PulsatingButton>
      </div>

      <div>
        <div className="relative flex h-full w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-background px-20 md:shadow-xl">
          <div className="flex flex-row gap-4 [perspective:300px]">
            <Marquee
              className="h-48 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
              vertical
              style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
              }}
            >
              {pokemonHeaderData.goldPokemonImages.length &&
                pokemonHeaderData.goldPokemonImages.map((data, idx) => (
                  <img
                    key={idx}
                    src={data.img}
                    alt={data.name}
                    style={{ transform: "scale(1)" }}
                    className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
                  />
                ))}
            </Marquee>
          </div>
        </div>
        <PulsatingButton pulseColor="#FBCB1C" className="bg-[#FBCB1C] mx-auto">
          Gold Pokemons
        </PulsatingButton>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
