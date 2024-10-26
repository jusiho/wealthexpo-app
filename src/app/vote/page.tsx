import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { headers } from "next/headers";

export default async function Page() {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_URL_LOCAL
    }/api/voteCategories?page=${1}&perPage=${15}&endpoint=vote-categories`,
    {
      method: "GET",
      headers: headers(),
    }
  );

  const res = await response.json();
  const categorias = res.data;

  return (
    <div
      className=" bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/vote/WECO-AWARDS-FONDO.jpg')" }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Votación de Premios Financieros
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Selecciona la categoría en la que deseas votar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((category: any) => (
            <Link
              key={category.id}
              href={`/vote/${category.id}`}
              className="w-full"
            >
              <Card className="cursor-pointer transition-all w-full">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src={category.image}
                />
                <CardFooter className="absolute bottom-0">
                  {category.title}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
