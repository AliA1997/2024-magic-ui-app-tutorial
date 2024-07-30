export interface Cache {
  data: any;
  timestamp: number;
}


export interface PokemonHeaderData {
  bluePokemonImages: any[];
  redPokemonImages: any[];
  goldPokemonImages: any[];
}

export interface PokemonContextType {
  pokemonHeaderData: PokemonHeaderData;
  setPokemonHeaderData: (dt: PokemonHeaderData) => void;
  redPokemons: any[];
  setRedPokemons: (pokes: any[]) => void;
  bluePokemons: any[];
  setBluePokemons: (pokes: any[]) => void;
  goldPokemons: any[];
  setGoldPokemons: (pokes: any[]) => void;
}

export interface PokemonHeader {
  name: string;
  img: string;
}

export interface PokemonToDisplay {
  id: number;
  name: string;
  image: string;
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  weight: number;
}
