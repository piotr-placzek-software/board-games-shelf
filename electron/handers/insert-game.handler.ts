import { PrismaClient } from '@prisma/client';

export async function insertGameHandler(data) {
  const dbClient = new PrismaClient();
  const gameDetails = await dbClient.gameDetails.create({
    data: {
      title: data.title,
      thumbnailUrl: data.thumbnailUrl,
      isExtensionFor: data.isExtensionFor,
    },
  });
  return gameDetails;
}
