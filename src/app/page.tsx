import { buttonVariants } from '@/components/ui/button';
import { getSession } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const session = await getSession()
  return (
    <section className="py-14 px-6 md:px-20 lg:px-32">
      <div className="grid gap-2 sm:text-center sm:place-items-center sm:max-w-lg md:max-w-2xl sm:mx-auto lg:max-w-[900px]">
        <h1 className="font-semibold text-4xl md:text-5xl lg:text-7xl">Open-Source url shortener built with <span className="underline underline-offset-[5px] decoration-blue-400">nextjs</span> & <span className="underline underline-offset-[5px] decoration-blue-400">express.js</span></h1>
        <p className="text-muted-foreground mt-2 md:text-lg text-base max-w-2xl">I have coded this url shortner using nextjs 15, shadcn/ui & nodejs express with detailed analytics of links being clicked!</p>
        <div className="flex items-center sm:justify-center flex-wrap gap-3 mt-3">
          {
            session?.userId ? (
              <Link href="/url" className={buttonVariants({ variant: "outline" })}>Dashboard</Link>
            ) : (
              <Link href="/sign-up" className={buttonVariants({ variant: "outline" })}>Get Started</Link>
            )
          }
          <Link href="https://github.com/r2hu1/u-sh" className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-1")}><Star className="h-3.5 w-3.5" />Star on Github</Link>
        </div>
      </div>
    </section>

  );
}