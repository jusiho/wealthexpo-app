import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { headers } from "next/headers";
import TitleSvg from "./tItleSvg";

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
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex flex-col items-center">
          <TitleSvg />
        </div>

        <p className="text-center text-[#FFCD00] my-8">
          Selecciona la(s) categoría(s) en las que deseas votar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((category: any) => (
            <Link
              key={category.id}
              href={`/we-awards-2024/${category.id}`}
              className="w-full"
            >
              <Card className="cursor-pointer transition-all w-full border border-white">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src={category.image}
                />
                <CardFooter className="absolute bottom-0">
                  <p className="text-3xl text-left">{category.title}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
