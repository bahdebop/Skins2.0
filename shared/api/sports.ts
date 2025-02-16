// NHL API endpoints
const NHL_API_BASE = 'https://statsapi.web.nhl.com/api/v1';

// ESPN API endpoints (for PGA data)
const ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports/golf/pga';

export interface NHLGame {
  gamePk: number;
  gameDate: string;
  teams: {
    away: { team: { name: string }; score: number };
    home: { team: { name: string }; score: number };
  };
  status: {
    abstractGameState: string;
    detailedState: string;
  };
}

export interface PGATournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  course: {
    name: string;
    location: string;
  };
  status: string;
}

export const getNHLSchedule = async (startDate: string, endDate: string) => {
  try {
    const response = await fetch(
      `${NHL_API_BASE}/schedule?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    return data.dates.flatMap((date: any) => date.games as NHLGame[]);
  } catch (error) {
    console.error('Error fetching NHL schedule:', error);
    throw error;
  }
};

export const getNHLGameStats = async (gameId: number) => {
  try {
    const response = await fetch(
      `${NHL_API_BASE}/game/${gameId}/feed/live`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching NHL game stats:', error);
    throw error;
  }
};

export const getPGATournaments = async () => {
  try {
    const response = await fetch(
      `${ESPN_API_BASE}/tournaments`
    );
    const data = await response.json();
    return data.tournaments as PGATournament[];
  } catch (error) {
    console.error('Error fetching PGA tournaments:', error);
    throw error;
  }
};

export const getPGATournamentLeaderboard = async (tournamentId: string) => {
  try {
    const response = await fetch(
      `${ESPN_API_BASE}/tournaments/${tournamentId}/leaderboard`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching PGA tournament leaderboard:', error);
    throw error;
  }
};
