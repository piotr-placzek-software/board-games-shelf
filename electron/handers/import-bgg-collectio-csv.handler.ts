const csv = require('csvtojson');
import { PrismaClient } from '@prisma/client';

export async function importBggCollectionCsv(data: ArrayBuffer) {
  let counter = 0;

  try {
    const collection = await csv().fromString(
      new TextDecoder('utf-8').decode(data),
    );
    const dbClient = new PrismaClient();

    for (const game of collection) {
      try {
        await dbClient.gameDetails.create({
          data: {
            title: game.objectname,
          },
        });
        counter += 1;
      } catch (e) {
        console.error(
          `ERROR: can not create "${game.objectname}": ${e instanceof Error ? e.message : 'unknown error'}`,
        );
        continue;
      }
    }
  } catch (e) {
    console.error(`ERROR: ${e instanceof Error ? e.message : 'unknown error'}`);
  }
  return counter;
}
