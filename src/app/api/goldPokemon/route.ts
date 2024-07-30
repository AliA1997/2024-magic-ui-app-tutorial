import { NextResponse } from "next/server";
import { Cache, PokemonToDisplay } from "@/lib/typings";

let cache: Cache | null = null;
const CACHE_DURATION = 60 * 1000 * 60 * 24; // 1 day

const pokeApiBaseEndpoint = "https://pokeapi.co/api/v2";

async function fetchDataForGoldPokemon() {
  //Retrieve gold pokemon
  const goldPokemonRes = await (
    await fetch(`${pokeApiBaseEndpoint}/pokemon-color/yellow/`)
  ).json();
  const goldPokePromises = goldPokemonRes.pokemon_species
    .slice(0, 25)
    .map((p: any) =>
      fetch(`${pokeApiBaseEndpoint}/pokemon/${p.name}`).then((r) => r.json()).catch(() => ({}))
    );
  const goldPokePromisesDone = await Promise.all(goldPokePromises);

  const goldPokemons: PokemonToDisplay[] = goldPokePromisesDone.filter(p => p.name).map((p) => ({
    id: p.id,
    name: p.name,
    image: p && p.sprites ? p.sprites.front_default : "",
    abilities: p.abilities,
    stats: p.stats,
    weight: p.weight
  }));

  return goldPokemons;
}

async function GET() {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }
  const data = await fetchDataForGoldPokemon(); // Replace with your data fetching logic

  cache = { data, timestamp: now };

  return NextResponse.json(data);
}

export { GET };
