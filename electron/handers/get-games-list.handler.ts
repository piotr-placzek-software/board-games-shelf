import { PrismaClient } from '@prisma/client';

export async function getGamesListHandler() {
  const dbClient = new PrismaClient();
  const gamesDetails = await dbClient.gameDetails.findMany({
    orderBy: { title: 'asc' },
  });
  const results = [];
  for (let gameDetails of gamesDetails) {
    const lastPlayedAt = await dbClient.playingHistory.findFirst({
      where: {
        gameDetailsId: gameDetails.id,
      },
      orderBy: { playedAt: 'desc' },
      select: { playedAt: true },
    });
    results.push({
      ...gameDetails,
      lastPlayed: lastPlayedAt,
    });
  }
  return gamesDetails;
}
