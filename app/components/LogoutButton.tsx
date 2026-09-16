"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
    >
      Logout
    </button>
  );
}