import Image from "next/image";
import Link from "next/link";
import SwrProvider from "../Providers/SwrProvider";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/_utils/AuthOptions";
const UserTable = dynamic(() => import("./TableConfirm"), { ssr: false });

export default async function Page() {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    notFound();
  }

  const { roles } = session.user;
  console.log("roles", roles);

  const isAdmin = roles.some((role: string) => role === "administrator");

  if (!isAdmin) {
    notFound();
  }

  return (
    <SwrProvider>
      <main className="dark:bg-black">
        <div className="text-center w-full flex justify-center pt-10 my-6">
          <Link href="/">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
              src="/landing/wealthexpo.png"
              alt="Next.js Logo"
              width={250}
              height={100}
              priority
            />
          </Link>
        </div>
        <UserTable />
      </main>
    </SwrProvider>
  );
}
