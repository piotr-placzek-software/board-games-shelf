export type GameDetails = {
  id: number;
  title: string;
  thumbnailUrl?: string;
  isExtensionFor?: number;
  lastPlayed?: Date;
};

export type GameDetailsInsertOrUpdateSuccess = {
  success: true;
  gameDetails: GameDetails;
};

export type GameDetailsInsertOrUpdateError = {
  success: false;
  error: any;
};

export type GameDetailsInsertOrUpdateResult =
  | GameDetailsInsertOrUpdateSuccess
  | GameDetailsInsertOrUpdateError;

export type RegisterPlaySuccess = {
  success: true;
  lastPlayingEntry: { gameDetailsId: number; playedAt: Date };
};

export type RegisterPlayError = {
  success: false;
  error: any;
};

export type RegisterPlayResult = RegisterPlaySuccess | RegisterPlayError;
