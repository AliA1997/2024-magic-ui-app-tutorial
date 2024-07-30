import { NextResponse } from "next/server";
import { Cache, PokemonHeader } from "@/lib/typings";

let cache: Cache | null = null;
const CACHE_DURATION = 60 * 1000 * 60 * 24; // 1 day

const pokeApiBaseEndpoint = "https://pokeapi.co/api/v2";
async function fetchDataForPokemonHeader() {
  //Retrieve blue pokemon
  const bluePokemonRes = await (
    await fetch(`${pokeApiBaseEndpoint}/pokemon-color/blue/`)
  ).json();
  const bluePokePromises = bluePokemonRes.pokemon_species
    .slice(0, 15)
    .map((p: any) =>
      fetch(`${pokeApiBaseEndpoint}/pokemon/${p.name}`).then((r) => r.json())
    );
  const bluePokePromisesDone = await Promise.all(bluePokePromises);
  const bluePokemonImages = bluePokePromisesDone.map((p) => ({
    name: p.name,
    img: p.sprites.front_default,
  }));

  //Retrieve red pokemon
  const redPokemonRes = await (
    await fetch(`${pokeApiBaseEndpoint}/pokemon-color/red/`)
  ).json();
  const redPokePromises = redPokemonRes.pokemon_species
    .slice(0, 15)
    .map((p: any) =>
      fetch(`${pokeApiBaseEndpoint}/pokemon/${p.name}`).then((r) => r.json())
    );
  const redPokePromisesDone = await Promise.all(redPokePromises);
  const redPokemonImages = redPokePromisesDone.map((p) => ({
    name: p.name,
    img: p.sprites.front_default,
  }));

  //Retrieve gold pokemon
  const goldPokemonRes = await (
    await fetch(`${pokeApiBaseEndpoint}/pokemon-color/yellow/`)
  ).json();
  const goldPokePromises = goldPokemonRes.pokemon_species
    .slice(0, 15)
    .map((p: any) =>
      fetch(`${pokeApiBaseEndpoint}/pokemon/${p.name}`).then((r) => r.json())
    );
  const goldPokePromisesDone = await Promise.all(goldPokePromises);
  const goldPokemonImages: PokemonHeader[] = goldPokePromisesDone.map((p) => ({
    name: p.name,
    img: p.sprites.front_default,
  }));

  return { redPokemonImages, goldPokemonImages, bluePokemonImages };
}

async function GET() {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }
  const data = await fetchDataForPokemonHeader(); // Replace with your data fetching logic

  cache = { data, timestamp: now };

  return NextResponse.json(data);
}

export { GET };
