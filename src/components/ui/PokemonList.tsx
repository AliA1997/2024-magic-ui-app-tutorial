"use client";
import Marquee from "@/components/magicui/marquee";
import { usePokemons } from "@/contexts/PokemonContext";
import { useEffect, useMemo } from "react";
import PulsatingButton from "./pulsating-button";
import { PokemonToDisplay } from "@/lib/typings";
import { MagicCard } from "../magicui/magic-card";

interface PokemonListProps {
  color: string;
}

export default function PokemonList({ color }: PokemonListProps) {
  // Extract red, blue, gold pokemons from the usePokemons hook
  const {
    redPokemons,
    setRedPokemons,
    bluePokemons,
    setBluePokemons,
    goldPokemons,
    setGoldPokemons,
  } = usePokemons();
  
  // Get the pokemon endpoint that is memoized value based on the color or color parameter.
  const getPokeEndpoint = useMemo(() => {
    if (color === "red") return "/api/redPokemon";
    else if (color === "blue") return "/api/bluePokemon";
    else return "/api/goldPokemon";
  }, [color]);

  useEffect(() => {
    (async function () {
      const pokeData = await fetch(getPokeEndpoint, {
        method: "GET",
      }).then((res) => res.json());
      
      if (color === "red") setRedPokemons(pokeData);
      else if (color === "blue") setBluePokemons(pokeData);
      else setGoldPokemons(pokeData);
    })();
  }, [getPokeEndpoint, color, setRedPokemons, setBluePokemons, setGoldPokemons]);

  // Return the red, blue, and gold pokemons which is memoized, and will return pokemon based on color parameter.
  const pokemonToDisplay = useMemo(() => {
    if (color === "red") return redPokemons;
    else if (color === "blue") return bluePokemons;
    return goldPokemons;
  }, [color, redPokemons, bluePokemons, goldPokemons]);

  return (
    <div className="flex flex-row flex-wrap w-full">
      {pokemonToDisplay &&
        pokemonToDisplay.map(
          (pokemonToDisplay: PokemonToDisplay, pIdx: number) => (
            <MagicCard
              key={pIdx}
              className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl w-1/4 h-[700px]"
              gradientColor={"#D9D9D955"}
            >
                <img className='w-full' src={pokemonToDisplay.image} alt={pokemonToDisplay.name} />
                <p className="text-2xl font-black capitalize">{pokemonToDisplay.name}</p>
                <h5 className='text-xl mt-2'>Abilities</h5>
                <hr />
                <ul>
                  {pokemonToDisplay.abilities &&
                    pokemonToDisplay.abilities.map((a, aIdx) => (
                      <li key={aIdx} className='text-lg font-bold'>{a.ability.name}</li>
                    ))}
                </ul>
                <h5 className='text-xl mt-2'>Stats</h5>
                <hr />
                <ul className='w-[300px]'>
                  {pokemonToDisplay.stats &&
                    pokemonToDisplay.stats.map((stat, sIdx) => (
                      <li className="flex flex-row justify-between px-2" key={sIdx}>
                        <p className='text-lg font-bold'>{stat.stat.name}:</p>
                        <p className='text-lg'>{stat.base_stat}</p>
                      </li>
                    ))}
                </ul>
            </MagicCard>
          )
        )}
    </div>
  );
}
