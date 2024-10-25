import { Button, Link } from "@nextui-org/react";
import { headers } from "next/headers";
import ContestantsComp from "./contestantsComp";

type Props = {
  params: {
    id: string;
  };
};

export default async function Home({ params }: Props) {
  const { id } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_LOCAL}/api/voteCategory?endpoint=contestants&categoryId=${id}`,
    {
      method: "GET",
      headers: headers(),
    }
  );

  const res = await response.json();

  const contestants = res.contestants;
  const title = res.title;
  const contestantsArray = Object.keys(contestants).map((key) => ({
    id: key,
    nombre: contestants[key].name,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Votación para la Categoría {title}
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Selecciona la empresa por la cual deseas votar
      </p>

      <ContestantsComp contestantsArray={contestantsArray} categoryId={id} />

      <div className="flex justify-center mt-8">
        <Link
          href={"/vote"}
          className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          <div className="flex align-middle">volver a categorias</div>
        </Link>
      </div>
    </div>
  );
}
