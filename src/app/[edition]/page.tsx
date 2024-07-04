import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/_utils/AuthOptions";
import { notFound } from "next/navigation";
import Image from "next/image";
import { image } from "@nextui-org/react";
import { cn } from "../_utils/tailwindMerge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

type Props = {
  params: {
    edition: string;
  };
};

const editions: { [key: string]: string } = {
  peru: "https://wealthexpo.la/wp-content/uploads/2023/09/Group-3.png",
  mexico:
    "https://wealthexpo.la/wp-content/uploads/2023/09/Group-7-1024x257.png",
  colombia:
    "https://wealthexpo.la/wp-content/uploads/2023/09/Group-11-1024x223.png",
};

const editionFondo: { [key: string]: string } = {
  peru: "/landing/fondo_peru.png",
  mexico: "/landing/fondo_mexico.png",
  colombia: "/landing/fondo_colombia.png",
};

const colors: { [key: string]: string } = {
  peru: "border-[#be0f1f]",
  mexico: "border-[#05fd5f]",
  colombia: "border-[#ffcd00]",
};

const bgColors: { [key: string]: string } = {
  peru: "bg-[#be0f1f]",
  mexico: "bg-[#05fd5f]",
  colombia: "bg-[#ffcd00]",
};

export default async function Page({ params }: Props) {
  const { edition } = params;
  const session = await getServerSession(AuthOptions);

  if (!editions[edition]) {
    notFound();
  }

  const imageUrl = editionFondo[edition];

  if (!session) {
    return (
      <>
        <section
          className="h-screen py-10 relative bg-black sm:py-16 lg:py-24 lg:pt-36"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
          }}
        >
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
            <div className="flex justify-center max-w-2xl mx-auto items-center">
              <Image src={editions[edition]} width={500} height={500} alt="" />
            </div>

            <div className=" grid items-center max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-2 z-10 ">
              <Link
                href={`/${edition}/sponsors`}
                className={cn(
                  colors[edition],
                  "bg-gradient-to-r border rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                )}
              >
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0zm-14.9 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2h39.5c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 39.5-161.2c77.2 12 136.3 78.8 136.3 159.4 0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-80.6 59.1-147.4 136.3-159.4l39.5 161.2 33.4-123.9z" />
                </svg>
                Sponsors
              </Link>
              <Link
                href={`/${edition}/speakers`}
                className={cn(
                  colors[edition],
                  "bg-gradient-to-r border rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                )}
              >
                <svg
                  height="3em"
                  width="3em"
                  viewBox="0 0 114 112"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M51.8988 0.658419C42.4186 3.16074 36.3345 12.7862 38.3133 22.1505C39.1375 26.0488 40.3414 28.3822 42.9576 31.1497C46.7285 35.1387 51.3368 37.1548 56.6837 37.1548C62.2835 37.1548 66.5977 35.3072 70.4981 31.2381C77.4863 23.9482 77.3102 12.7254 70.0954 5.5913C65.1401 0.691678 58.5459 -1.09601 51.8988 0.658419ZM84.0832 28.9314C81.8041 30.2382 80.5607 32.3672 80.5607 34.9632C80.5607 39.9661 85.7577 43.2312 90.638 41.2947C92.0051 40.752 97.9544 47.0967 99.9855 51.2633C101.662 54.7026 103.058 59.8503 102.482 60.4761C102.307 60.6665 100.395 60.7649 98.2312 60.6949L94.2984 60.5676L93.9418 58.8687C92.5316 52.1525 86.6808 45.8595 79.4008 43.2294C76.5251 42.1901 76.4665 42.1874 56.7782 42.1874C37.0899 42.1874 37.0314 42.1901 34.1556 43.2294C26.8756 45.8595 21.0266 52.1508 19.6147 58.8687L19.2576 60.5676L10.4756 60.7864C1.90828 60.9999 1.67318 61.0306 0.846794 62.0384C0.381035 62.6065 0 63.4708 0 63.9587C0 65.6392 9.79779 91.6099 10.7315 92.4046C11.4679 93.0313 12.4965 93.1704 16.3907 93.1704H21.1499L20.0795 86.7155C18.3314 76.1727 19.0047 72.512 23.417 68.5796C27.1005 65.2965 26.2138 65.3814 56.7782 65.3814C87.3426 65.3814 86.4559 65.2965 90.1394 68.5796C94.5517 72.512 95.225 76.1727 93.4769 86.7155L92.4065 93.1704H96.9568C99.4595 93.1704 101.83 93.0479 102.225 92.8987C103.294 92.4939 103.82 91.2834 108.699 77.9998C111.16 71.3003 113.359 65.6317 113.587 65.4033C113.814 65.1744 114 64.4033 114 63.6891C114 62.9754 113.888 62.5014 113.751 62.6362C113.615 62.7714 113.025 62.4104 112.441 61.8341C111.857 61.2577 111.07 60.7864 110.693 60.7864C110.316 60.7864 110.001 60.7369 109.992 60.677C108.546 50.4511 104.391 42.6675 97.3848 37.0568C95.512 35.557 94.4985 34.4253 94.4922 33.828C94.4798 32.6683 92.8523 30.2819 91.2994 29.1472C89.4678 27.8089 86.2106 27.7113 84.0832 28.9314ZM0.102911 64.2874C0.102911 65.1298 0.194288 65.4746 0.305626 65.0532C0.417409 64.6318 0.417409 63.943 0.305626 63.5215C0.194288 63.1001 0.102911 63.4449 0.102911 64.2874ZM29.4781 75.8647C28.8793 76.4555 28.3891 77.2528 28.3891 77.6366C28.3891 79.398 33.3004 109.478 33.7116 110.237C33.9671 110.708 34.5575 111.294 35.0237 111.54C36.1846 112.153 77.3718 112.153 78.5327 111.54C78.9989 111.294 79.5893 110.708 79.8448 110.237C80.256 109.478 85.1673 79.398 85.1673 77.6366C85.1673 77.2528 84.6772 76.4555 84.0783 75.8647L82.9898 74.7903H30.5666L29.4781 75.8647Z"
                    fill="white"
                  />
                </svg>
                Speakers
              </Link>
              <div
                className={cn(
                  colors[edition],
                  "bg-gradient-to-r border group rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                )}
              >
                <svg
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                Asistentes
                <div className="absolute bottom-0 flex gap-2">
                  <Link
                    href={"https://wealthexpo.la/sponsors-contacto/"}
                    target="_blank"
                    className=" items-center flex px-4 mb-2 justify-center bg-red-500 text-white  h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded transform hover:-translate-y-1"
                  >
                    Solicitar ser sponsor
                  </Link>
                </div>
              </div>
              <Popover
                placement="top"
                offset={10}
                showArrow={true}
                classNames={{
                  content: "bg-gray-900",
                }}
                backdrop={"blur"}
              >
                <PopoverTrigger>
                  <Button
                    className={cn(
                      colors[edition],
                      "bg-gradient-to-r border rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    )}
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="3em"
                      width="3em"
                    >
                      <path d="M4 .5a.5.5 0 00-1 0V1H2a2 2 0 00-2 2v1h16V3a2 2 0 00-2-2h-1V.5a.5.5 0 00-1 0V1H4V.5zM16 14V5H0v9a2 2 0 002 2h12a2 2 0 002-2zM9.5 7h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm3 0h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zM2 10.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm3.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" />
                    </svg>
                    Agenda
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2 flex gap-3">
                    <Link
                      href={`/${edition}/agenda`}
                      className={cn(
                        bgColors[edition],
                        "bg-gradient-to-r p-8 text-black font-bold rounded-lg  hover:from-[#2f3542] hover:to-[#2f3542] flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                      )}
                    >
                      Principal
                    </Link>
                    <Link
                      href={`/${edition}/agenda-workshop`}
                      className={cn(
                        bgColors[edition],
                        "bg-gradient-to-r p-8 text-black font-bold rounded-lg  hover:from-[#2f3542] hover:to-[#2f3542] flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                      )}
                    >
                      Workshops
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>
      </>
    );
  }

  const roles = session.user.roles;

  const isAdmin = roles.some((role: string) => role === "administrator");
  const hasRole = roles.some((r: string) => r === `sponsor_${edition}`);
  const isSponsor = isAdmin || hasRole;

  return (
    <>
      <section
        className="h-screen py-10 relative  sm:py-16 lg:py-24 lg:pt-36"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
        }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
          <div className="flex justify-center max-w-2xl mx-auto items-center px-10">
            <Image src={editions[edition]} width={500} height={500} alt="" />
          </div>

          <div className=" grid items-center max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-2 z-10 ">
            <Link
              href={`/${edition}/sponsors`}
              className={cn(
                colors[edition],
                "bg-gradient-to-r border rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              )}
            >
              <svg
                viewBox="0 0 448 512"
                fill="currentColor"
                height="3em"
                width="3em"
              >
                <path d="M224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0zm-14.9 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2h39.5c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 39.5-161.2c77.2 12 136.3 78.8 136.3 159.4 0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-80.6 59.1-147.4 136.3-159.4l39.5 161.2 33.4-123.9z" />
              </svg>{" "}
              Sponsors
            </Link>
            <Link
              href={`/${edition}/speakers`}
              className={cn(
                colors[edition],
                "bg-gradient-to-r border rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              )}
            >
              <svg
                height="3em"
                width="3em"
                viewBox="0 0 114 112"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M51.8988 0.658419C42.4186 3.16074 36.3345 12.7862 38.3133 22.1505C39.1375 26.0488 40.3414 28.3822 42.9576 31.1497C46.7285 35.1387 51.3368 37.1548 56.6837 37.1548C62.2835 37.1548 66.5977 35.3072 70.4981 31.2381C77.4863 23.9482 77.3102 12.7254 70.0954 5.5913C65.1401 0.691678 58.5459 -1.09601 51.8988 0.658419ZM84.0832 28.9314C81.8041 30.2382 80.5607 32.3672 80.5607 34.9632C80.5607 39.9661 85.7577 43.2312 90.638 41.2947C92.0051 40.752 97.9544 47.0967 99.9855 51.2633C101.662 54.7026 103.058 59.8503 102.482 60.4761C102.307 60.6665 100.395 60.7649 98.2312 60.6949L94.2984 60.5676L93.9418 58.8687C92.5316 52.1525 86.6808 45.8595 79.4008 43.2294C76.5251 42.1901 76.4665 42.1874 56.7782 42.1874C37.0899 42.1874 37.0314 42.1901 34.1556 43.2294C26.8756 45.8595 21.0266 52.1508 19.6147 58.8687L19.2576 60.5676L10.4756 60.7864C1.90828 60.9999 1.67318 61.0306 0.846794 62.0384C0.381035 62.6065 0 63.4708 0 63.9587C0 65.6392 9.79779 91.6099 10.7315 92.4046C11.4679 93.0313 12.4965 93.1704 16.3907 93.1704H21.1499L20.0795 86.7155C18.3314 76.1727 19.0047 72.512 23.417 68.5796C27.1005 65.2965 26.2138 65.3814 56.7782 65.3814C87.3426 65.3814 86.4559 65.2965 90.1394 68.5796C94.5517 72.512 95.225 76.1727 93.4769 86.7155L92.4065 93.1704H96.9568C99.4595 93.1704 101.83 93.0479 102.225 92.8987C103.294 92.4939 103.82 91.2834 108.699 77.9998C111.16 71.3003 113.359 65.6317 113.587 65.4033C113.814 65.1744 114 64.4033 114 63.6891C114 62.9754 113.888 62.5014 113.751 62.6362C113.615 62.7714 113.025 62.4104 112.441 61.8341C111.857 61.2577 111.07 60.7864 110.693 60.7864C110.316 60.7864 110.001 60.7369 109.992 60.677C108.546 50.4511 104.391 42.6675 97.3848 37.0568C95.512 35.557 94.4985 34.4253 94.4922 33.828C94.4798 32.6683 92.8523 30.2819 91.2994 29.1472C89.4678 27.8089 86.2106 27.7113 84.0832 28.9314ZM0.102911 64.2874C0.102911 65.1298 0.194288 65.4746 0.305626 65.0532C0.417409 64.6318 0.417409 63.943 0.305626 63.5215C0.194288 63.1001 0.102911 63.4449 0.102911 64.2874ZM29.4781 75.8647C28.8793 76.4555 28.3891 77.2528 28.3891 77.6366C28.3891 79.398 33.3004 109.478 33.7116 110.237C33.9671 110.708 34.5575 111.294 35.0237 111.54C36.1846 112.153 77.3718 112.153 78.5327 111.54C78.9989 111.294 79.5893 110.708 79.8448 110.237C80.256 109.478 85.1673 79.398 85.1673 77.6366C85.1673 77.2528 84.6772 76.4555 84.0783 75.8647L82.9898 74.7903H30.5666L29.4781 75.8647Z"
                  fill="white"
                />
              </svg>
              Speakers
            </Link>
            {isSponsor ? (
              <Link
                href={`/${edition}/asistents`}
                className={cn(
                  colors[edition],
                  "bg-gradient-to-r border group rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                )}
              >
                <svg
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                Asistentes
              </Link>
            ) : (
              <div
                className={cn(
                  colors[edition],
                  "bg-gradient-to-r border rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                )}
              >
                <svg
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                Asistentes
                <div className="absolute bottom-0 flex gap-2">
                  <Link
                    href={"https://wealthexpo.la/sponsors-contacto/"}
                    target="_blank"
                    className=" items-center flex px-4 mb-2 justify-center bg-red-500 text-white  h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded transform hover:-translate-y-1"
                  >
                    Solicitar ser sponsor
                  </Link>
                </div>
              </div>
            )}

            <Popover
              placement="top"
              offset={10}
              showArrow={true}
              classNames={{
                content: "bg-gray-900",
              }}
              backdrop={"blur"}
            >
              <PopoverTrigger>
                <Button
                  className={cn(
                    colors[edition],
                    "bg-gradient-to-r border rounded-lg bg-black hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                  )}
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="3em"
                    width="3em"
                  >
                    <path d="M4 .5a.5.5 0 00-1 0V1H2a2 2 0 00-2 2v1h16V3a2 2 0 00-2-2h-1V.5a.5.5 0 00-1 0V1H4V.5zM16 14V5H0v9a2 2 0 002 2h12a2 2 0 002-2zM9.5 7h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm3 0h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zM2 10.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm3.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" />
                  </svg>
                  Agenda
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2 flex gap-3">
                  <Link
                    href={`/${edition}/agenda`}
                    className={cn(
                      bgColors[edition],
                      "bg-gradient-to-r p-8 text-black font-bold rounded-lg  hover:from-[#2f3542] hover:to-[#2f3542] flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    )}
                  >
                    Principal
                  </Link>
                  <Link
                    href={`/${edition}/agenda-workshop`}
                    className={cn(
                      bgColors[edition],
                      "bg-gradient-to-r p-8 text-black font-bold rounded-lg  hover:from-[#2f3542] hover:to-[#2f3542] flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    )}
                  >
                    Workshops
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
    </>
  );
}
