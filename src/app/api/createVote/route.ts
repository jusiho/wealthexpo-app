import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthOptions } from "@/app/_utils/AuthOptions";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  const session = await getServerSession(AuthOptions);
  const token = session?.user.token;
  console.log("token --------> : ", token);

  // obtener datos de post
  const data = await request.json();
  console.log("data --------> : ", data);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(
      `${process.env.API_URL}/wp-json/myplugin/v1/vote`,
      requestOptions
    );
    console.log(res);

    if (!res.ok) {
      const response = await res.json();
      console.log(response);

      return NextResponse.json(
        { error: response.message || "Error desconocido" },
        { status: res.status }
      );
    }

    const response = await res.json();
    console.log(response);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error de servidor desconocido",
      },
      {
        status: 500,
      }
    );
  }
}
