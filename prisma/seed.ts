import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // --------------------------------
  // 1. Create Programming category
  // --------------------------------

  const category = await prisma.category.upsert({
    where: {
      name: "Programming",
    },
    update: {},
    create: {
      name: "Programming",
      description: "Programming and software development lessons.",
    },
  });

  console.log("✅ Category:", category.name);

  // --------------------------------
  // 2. Find an existing user
  // --------------------------------

  const user = await prisma.user.findFirst();

  if (!user) {
    console.log(
      "❌ No user found. Please register an account first."
    );

    return;
  }

  console.log("✅ User:", user.name);

  // --------------------------------
  // 3. Create test video
  // --------------------------------

  const video = await prisma.video.create({
    data: {
      title: "Introduction to Programming",

      description:
        "Learn the basic concepts of programming and software development.",

      videoUrl:
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

      thumbnailUrl:
        "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",

      duration: "10:30",

      categoryId: category.id,

      uploadedById: user.id,
    },
  });

  console.log("✅ Video:", video.title);

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });