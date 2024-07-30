import Header from "@/components/ui/Header";
import PokemonList from "@/components/ui/PokemonList";

export default function PokemonByColor({ params: { color } }: { params: { color: string } }) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header title={`${color} Pokemon`} />
      <PokemonList color={color} />
    </main>
  );
}
