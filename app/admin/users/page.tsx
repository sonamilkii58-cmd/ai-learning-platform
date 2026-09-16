import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function deleteStudent(formData: FormData) {
  "use server";

  const userId = formData.get("userId");
  if (typeof userId !== "string" || !userId) return;

  await prisma.user.deleteMany({
    where: { id: userId, role: "STUDENT" },
  });

  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const session = await auth();

  // User must be logged in
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/users");
  }

  // Check admin role
  const role = (
    session.user as {
      role?: "STUDENT" | "ADMIN";
    }
  ).role;

  // Only ADMIN can access this page
  if (role !== "ADMIN") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="text-6xl">🔒</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Access Denied
          </h1>

          <p className="mt-3 text-gray-600">
            You do not have permission to access the Admin Dashboard.
          </p>

          <div className="flex flex-wrap gap-3">
  <a
    href="/"
    className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
  >
    ← Home
  </a>

  <form action="/api/auth/signout" method="post">
    <button
      type="submit"
      className="rounded-lg bg-gray-900 px-5 py-3 text-center font-semibold text-white hover:bg-gray-800"
    >
      Sign out
    </button>
  </form>
</div>
        </div>
      </main>
    );
  }

  // Get registered users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-blue-600">
              LearnHub SonaMilkii
            </p>

            <h1 className="mt-1 text-4xl font-bold text-gray-900">
              👥 Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage and view registered LearnHub users.
            </p>
          </div>

          <a
            href="/"
            className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Home
          </a>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-4xl">👥</div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Total Users
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {users.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-4xl">🎓</div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Students
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {users.filter((user) => user.role === "STUDENT").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-4xl">🛡️</div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Administrators
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {users.filter((user) => user.role === "ADMIN").length}
            </p>
          </div>

        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">

          <div className="border-b px-6 py-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Registered Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Users who have registered on LearnHub SonaMilkii.
            </p>
          </div>

          {users.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-5xl">👤</div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No users yet
              </h3>

              <p className="mt-2 text-gray-500">
                Registered users will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      #
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      User
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Registered
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Updated
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
  Actions
</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                            {user.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {user.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              ID: {user.id}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {user.email}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {user.role === "ADMIN" ? (
                          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                            🛡️ ADMIN
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            🎓 STUDENT
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {user.createdAt.toLocaleDateString()}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {user.updatedAt.toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
  {user.role === "STUDENT" ? (
    <form action={deleteStudent}>
      <input type="hidden" name="userId" value={user.id} />
      <button
        type="submit"
        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        Delete
      </button>
    </form>
  ) : (
    <span className="text-sm text-gray-400">
      Protected
    </span>
  )}
</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

        {/* Back */}
        <div className="mt-8">
          <a
            href="/"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            ← Back to LearnHub
          </a>
        </div>

      </div>
    </main>
  );
}