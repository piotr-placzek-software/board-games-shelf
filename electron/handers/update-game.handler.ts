import { PrismaClient } from '@prisma/client';

export async function updateGameHandler(data) {
  const dbClient = new PrismaClient();
  const gameDetails = await dbClient.gameDetails.update({
    where: { id: data.id },
    data: {
      title: data.title,
      thumbnailUrl: data.thumbnailUrl,
      isExtensionFor: data.isExtensionFor,
    },
  });
  return gameDetails;
}
