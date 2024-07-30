import Header from "@/components/ui/Header";
import Pokemon3DList from "@/components/ui/Pokemon3DList";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header title='Pokemon App' />
      <Pokemon3DList />
    </main>
  );
}
