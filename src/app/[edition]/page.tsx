import Link from "next/link";

type Props = {
  params: {
    edition: string;
  };
};
export default async function Page({ params }: Props) {
  const { edition } = params;
  console.log(edition);

  return (
    <>
      <section className="h-screen py-10 relative bg-black sm:py-16 lg:py-24 lg:pt-36">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-light text-white sm:text-4xl sm:leading-tight">
              WealthExpo Peru
            </h2>
          </div>

          <div className=" grid items-center max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-2 z-10 ">
            <Link
              href={`/${edition}/speakers`}
              className="bg-gray-700 h-24 flex shadow-lg items-center justify-center"
            >
              Speakers
            </Link>

            <Link
              href={`/${edition}/sponsors`}
              className="bg-gray-700 h-24 flex shadow-lg items-center justify-center"
            >
              Sponsors
            </Link>
            <Link
              href={`/users`}
              className="bg-gray-700 h-24 flex shadow-lg items-center justify-center"
            >
              Asistentes
            </Link>
            <Link
              href={`https://wealthexpo.la/peru/agenda`}
              className="bg-gray-700 h-24 flex shadow-lg items-center justify-center"
            >
              Agenda
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
