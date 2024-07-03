import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ThemeSwitcher } from "./ThemeSwitcher";

// Titulo de la pagina que aparece en el navegador barra de arriba
export const metadata = {
  title: "Wealth Expo LA | App Web Oficial",
  description:
    "Wealth Expo es el encuentro de trading y mercados financieros en Latinoamérica. Conecta con tus potenciales y actuales clientes en México, Colombia y Perú.",
};

const sponsors = [
  {
    role: "sponsor_peru",
    href: "/peru",
    imageSrc: "https://wealthexpo.la/wp-content/uploads/2023/09/Group-3.png",
    alt: "Wealth Expo Perú",
    color: "border-[#be0f1f]",
  },
  {
    role: "sponsor_mexico",
    href: "/mexico",
    imageSrc:
      "https://wealthexpo.la/wp-content/uploads/2023/09/Group-7-1024x257.png",
    alt: "Wealth Expo México",
    color: "border-[#05fd5f]",
  },
  {
    role: "sponsor_colombia",
    href: "/colombia",
    imageSrc:
      "https://wealthexpo.la/wp-content/uploads/2023/09/Group-11-1024x223.png",
    alt: "Wealth Expo Colombia",
    color: "border-[#ffcd00]",
  },
];

function SponsorBox({
  href,
  imageSrc,
  alt,
  color,
}: {
  href: string;
  imageSrc: string;
  alt: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className={`bg-black border ${color} h-32 flex flex-col shadow-lg items-center justify-center gap-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1`}
    >
      <Image src={imageSrc} alt={alt} width={500} height={500} />
    </Link>
  );
}

export default async function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/landing/fondo_mexico.png')",
        backgroundSize: "cover",
      }}
      className="flex min-h-screen flex-col justify-center items-center py-24"
    >
      <div className="z-20 px-10">
        <Image
          className="relative "
          src="/landing/wealthexpo.png"
          alt="Next.js Logo"
          width={500}
          height={250}
          priority
        />
      </div>

      <div className="py-10 relative sm:py-16 lg:py-24 lg:pt-36">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl  text-white sm:text-4xl sm:leading-tight tracking-widest font-bold">
              EDICIONES
            </h2>
          </div>
          {/* <ThemeSwitcher /> */}
          <div className="grid items-center max-w-4xl grid-cols-1 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-3 z-10">
            {sponsors.map(({ role, href, imageSrc, alt, color }) => (
              <SponsorBox
                key={role}
                href={href}
                imageSrc={imageSrc}
                alt={alt}
                color={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
