"use client";
import { PokemonContextType, PokemonHeaderData } from "@/lib/typings";
import React, { createContext, useState, useContext } from "react";


// Create a Context for the Pokémon data
const PokemonContext = createContext<PokemonContextType>({
  pokemonHeaderData: { redPokemonImages: [], bluePokemonImages: [], goldPokemonImages: [] },
  setPokemonHeaderData: (val: PokemonHeaderData) => {},
  redPokemons: [],
  setRedPokemons: (pokes: any[]) => {},
  bluePokemons: [],
  setBluePokemons: (pokes: any[]) => {},
  goldPokemons: [],
  setGoldPokemons: (pokes: any[]) => {},
});

// Create a Provider component
const PokemonProvider = ({ children }: React.PropsWithChildren<any>) => {
  // Define state for red, blue, and gold Pokémon
  const [pokemonHeaderData, setPokemonHeaderData] = useState<PokemonHeaderData>({
    redPokemonImages: [],
    bluePokemonImages: [],
    goldPokemonImages: []
  })
  const [redPokemons, setRedPokemons] = useState(["Charmander", "Vulpix"]);
  const [bluePokemons, setBluePokemons] = useState(["Squirtle", "Psyduck"]);
  const [goldPokemons, setGoldPokemons] = useState(["Ho-Oh", "Gyarados"]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonHeaderData,
        setPokemonHeaderData,
        redPokemons,
        bluePokemons,
        goldPokemons,
        setRedPokemons,
        setBluePokemons,
        setGoldPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
// Create a custom hook to use the Pokémon context
export const usePokemons = () => useContext(PokemonContext);

export default PokemonProvider;
