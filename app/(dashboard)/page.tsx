'use client'

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { UserButton } from "@clerk/nextjs"
import DataGrid from "./_components/data-grid";
import DataCharts from "./_components/data-chart";

export default function Home() {
  const { onOpen, onClose } = useNewAccount()

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
