const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

(async () => {
  try {
    await db.tag.createMany({
      data: [
        { name: "Technology" },
        { name: "Programming" },
        { name: "Science" },
        { name: "Art" },
        { name: "Music" },
        { name: "Travel" },
        { name: "Food" },
      ],
    });
    console.log("Success seeding tags");
  } catch (error) {
    console.log("Error seeding tags", error);
  } finally {
    await db.$disconnect();
  }
})();
