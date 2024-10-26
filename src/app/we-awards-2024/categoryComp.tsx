"use client";

import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Category({ categorias }: any) {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/we-awards-2024/${categoryId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Votación de Premios Financieros
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Selecciona la categoría en la que deseas votar
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((category: any) => (
          <Card
            key={category.id}
            className="cursor-pointer transition-all border"
            onClick={() => handleCategoryClick(category.id)}
          >
            <CardBody>{category.title}</CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
