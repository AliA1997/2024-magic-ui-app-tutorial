import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";

export default async function Header({ title }: { title: string }) {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center">
      <AnimatedGradientText>
        <h1
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#EF5350] via-[#3361A5] to-[#FBCB1C] bg-[length:var(--bg-size)_100%] bg-clip-text  text-8xl text-transparent capitalize`,
          )}
        >
            {title}
        </h1>
      </AnimatedGradientText>
    </div>
  );
}
