import Image from "next/image";
import Link from "next/link";

async function fetchOrders() {
  const res = await fetch("http://localhost:3000/api/orders");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const orders = await fetchOrders();
  console.log(orders);
  
  const cant = orders.length;

  return (
    <div>
      <div className="text-center w-full flex justify-center pt-10">
        <Link href="/">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
            src="/landing/wealthexpo.png"
            alt="Next.js Logo"
            width={250}
            height={100}
            priority
          />
        </Link>
      </div>
      <p className="text-lg text-center font-bold m-5">
        Lista de registrados {cant}
      </p>
      <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-800 text-gray-200">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="px-4 py-3">Firstname</th>
            <th className="px-4 py-3">Lastname</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Sex</th>
            <th className="px-4 py-3">Empresa</th>
            <th className="px-4 py-3">Telefono</th>
            <th className="px-4 py-3">Interes</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr className="bg-gray-700 border-b border-gray-600">
              <td className="px-4 py-3">{order.billing.first_name}</td>
              <td className="px-4 py-3">{order.billing.last_name}</td>
              {order.meta_data.map((meta: any) => (
                <td className="px-4 py-3">{meta.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
