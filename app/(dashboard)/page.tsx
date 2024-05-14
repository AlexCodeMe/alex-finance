'use client'
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  const { onOpen, onClose } = useNewAccount()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={onOpen}>Add account</Button>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
