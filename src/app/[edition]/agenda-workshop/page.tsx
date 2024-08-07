import { notFound } from "next/navigation";
import { image } from "@nextui-org/react";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
});
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
export const metadata = {
  title: "Agenda Oficial",
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

  return (
    <main className="dark:bg-black lg:mx-auto container">
      <PDFViewer fileUrl="/pdf/WE AGENDA WORKSHOPS.pdf" />
    </main>
  );
}
