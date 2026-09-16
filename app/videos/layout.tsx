import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/videos");
  }

  return children;
}