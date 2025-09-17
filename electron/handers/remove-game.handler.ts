import { PrismaClient } from '@prisma/client';

export async function removeGameHandler(data) {
  const dbClient = new PrismaClient();
  await dbClient.gameDetails.delete({
    where: { id: data.id },
  });
  await dbClient.playingHistory.deleteMany({
    where: { gameDetailsId: data.id },
  });
}
