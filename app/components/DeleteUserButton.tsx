"use client";

import { useState } from "react";

type DeleteUserButtonProps = {
  userId: string;
  userName: string;
};

export default function DeleteUserButton({
  userId,
  userName,
}: DeleteUserButtonProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${userName}?`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete user.");
        return;
      }

      alert("User deleted successfully.");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the user.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "🗑️ Delete"}
    </button>
  );
}