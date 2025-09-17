import { PrismaClient } from '@prisma/client';

export async function registerPlayHandler(data) {
  const dbClient = new PrismaClient();
  const lastPlayingEntry = await dbClient.playingHistory.create({
    data: {
      gameDetailsId: data.gameDetailsId,
      playedAt: new Date(),
    },
  });
  return lastPlayingEntry;
}
