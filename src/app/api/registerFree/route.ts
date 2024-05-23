import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  console.log("process.env.API_URL : ", process.env.API_URL);
  
  // obetener dato de la url
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const perPage = url.searchParams.get("perPage");
  const search = url.searchParams.get("search");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(
      `${process.env.API_URL}/wp-json/miplugin/v1/eventos?per_page=${perPage}&page=${page}&search=${search}`,
      requestOptions
    );
    console.log("res : ", res);
    

    if (!res.ok) {
      throw new Error(`Error fetching order count: ${res.statusText}`);
    }

    const response = await res.json();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("error --------------> ", error);
    
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}
