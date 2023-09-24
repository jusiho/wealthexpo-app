import Image from "next/image";
import Link from "next/link";
import UserTable from "./UserTable";

// async function fetchOrders() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL_LOCAL}/api/orders`);
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Home() {

  return (
    <div>
      <div className="text-center w-full flex justify-center pt-10">
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
    </div>
  );
}
