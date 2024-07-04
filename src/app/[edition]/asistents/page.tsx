import Image from "next/image";
import Link from "next/link";
import UserTable from "./UserTable";
import SwrProvider from "@/app/Providers/SwrProvider";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/_utils/AuthOptions";

export const metadata = {
  title: "Wealth Expo LA | App Web Oficial",
  description:
    "Wealth Expo es el encuentro de trading y mercados financieros en Latinoamérica. Conecta con tus potenciales y actuales clientes en México, Colombia y Perú.",
};

type Props = {
  params: {
    edition: string;
  };
};

export default async function Home({ params }: Props) {
  const { edition } = params;
  if (!["peru", "colombia", "mexico"].includes(edition)) {
    notFound();
  }
  const session = await getServerSession(AuthOptions);
  if (!session) {
    notFound();
  }

  return (
    <SwrProvider>
      <main className="dark:bg-black min-h-screen">
        <div className="text-center w-full flex justify-center pt-10">
          <Link href="/">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="/landing/wealthexpo.png"
              alt="Next.js Logo"
              width={250}
              height={100}
              priority
            />
          </Link>
        </div>
        <UserTable edition={edition} />
      </main>
    </SwrProvider>
  );
}
