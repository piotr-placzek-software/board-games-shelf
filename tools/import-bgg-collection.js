const { PrismaClient } = require("@prisma/client");
const csvtojson = require("csvtojson");

async function importMockedGamesList() {
  const dbClient = new PrismaClient();

  try {
    const collection = await csvtojson().fromFile("./collection.csv");
    for (const game of collection) {
      try {
        await dbClient.gameDetails.create({
          data: {
            title: game.objectname,
          },
        });
      } catch (e) {
        console.error(
          `ERROR: can not create "${game.objectname}": ${e instanceof Error ? e.message : "unknown error"}`,
        );
        continue;
      }
    }
  } catch (e) {
    console.error(
      `ERROR: can not read file: collection.csv: ${e instanceof Error ? e.message : "unknown error"}`,
    );
  }
}

importMockedGamesList();
