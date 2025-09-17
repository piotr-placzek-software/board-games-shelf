import { PrismaClient } from '@prisma/client';

export async function getRandomGameHandler() {
  const dbClient = new PrismaClient();
  const gamesCnt = await dbClient.gameDetails.count({
    where: {
      isExtensionFor: null,
    },
  });
  const gameDetails = await dbClient.gameDetails.findFirst({
    where: {
      id: Math.floor(Math.random() * (gamesCnt + 1) + 1),
    },
  });
  const lastPlayedAt = await dbClient.playingHistory.findFirst({
    where: {
      gameDetailsId: gameDetails.id,
    },
    orderBy: { playedAt: 'desc' },
    select: { playedAt: true },
  });
  return {
    ...gameDetails,
    lastPlayed: lastPlayedAt,
  };
}
