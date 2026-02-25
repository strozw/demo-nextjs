import { Suspense } from "react";
import { DemoClient } from "./demo-client";
import { DemoContextProvider } from "./demo-context";
import { Spinner } from "@/components/ui/spinner";
import { connection } from "next/server";

export default async function Page() {
  await connection();

  return (
    <DemoContextProvider
      initialDataPromise={getDemoData()}
      refetchDataAction={async () => {
        "use server";

        return await getDemoData();
      }}
    >
      <Suspense fallback={<Spinner />}>
        <DemoClient />
      </Suspense>
    </DemoContextProvider>
  );
}

async function getDemoData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Math.floor(Math.random() * 100);
}
