import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: {
    edition: string;
  };
};

const sponsors = [
  {
    role: "sponsor_peru",
    href: "/peru",
    imageSrc: "https://wealthexpo.la/wp-content/uploads/2023/09/Group-3.png",
    alt: "Wealth Expo Perú",
  },
  {
    role: "sponsor_mexico",
    href: "/mexico",
    imageSrc:
      "https://wealthexpo.la/wp-content/uploads/2023/09/Group-7-1024x257.png",
    alt: "Wealth Expo México",
  },
  {
    role: "sponsor_colombia",
    href: "/colombia",
    imageSrc:
      "https://wealthexpo.la/wp-content/uploads/2023/09/Group-11-1024x223.png",
    alt: "Wealth Expo Colombia",
  },
];

function SponsorBox({
  href,
  imageSrc,
  alt,
  isSponsor,
}: {
  href: string;
  imageSrc: string;
  alt: string;
  isSponsor: boolean;
}) {
  return isSponsor ? (
    <Link
      href={href}
      className="bg-gray-900 h-32 flex flex-col shadow-lg items-center justify-center gap-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <Image src={imageSrc} alt={alt} width={500} height={500} />
    </Link>
  ) : (
    <div className="relative group bg-gray-900 h-32 flex flex-col shadow-lg items-center justify-center gap-2 px-4 rounded-md">
      <Image src={imageSrc} alt={alt} width={500} height={500} />
      <button className="absolute bottom-0 bg-red-500 text-white w-full h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded">
        Solicitar ser sponsor
      </button>
    </div>
  );
}

export default async function Page({ params }: Props) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    notFound();
  }

  const roles = session.user.roles;

  const isAdmin = roles.some((role: string) => role === "administrator");
  const hasRole = (role: string) => roles.some((r: string) => r === role);

  return (
    <section className="h-screen py-10 relative bg-black sm:py-16 lg:py-24 lg:pt-36">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-light text-white sm:text-4xl sm:leading-tight">
            Ediciones wealthexpo
          </h2>
        </div>

        <div className="grid items-center max-w-4xl grid-cols-3 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-3 z-10">
          {sponsors.map(({ role, href, imageSrc, alt }) => (
            <SponsorBox
              key={role}
              href={href}
              imageSrc={imageSrc}
              alt={alt}
              isSponsor={isAdmin || hasRole(role)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
