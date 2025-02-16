import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import {
  Card,
  Text,
  useTheme,
  SegmentedButtons,
  List,
  ActivityIndicator,
} from 'react-native-paper';
import { format } from 'date-fns';
import {
  getNHLSchedule,
  getPGATournaments,
  NHLGame,
  PGATournament,
} from '../../../shared/api/sports';

const Events = () => {
  const theme = useTheme();
  const [eventType, setEventType] = useState<'PGA' | 'NHL'>('PGA');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nhlGames, setNhlGames] = useState<NHLGame[]>([]);
  const [pgaTournaments, setPgaTournaments] = useState<PGATournament[]>([]);

  const fetchEvents = async () => {
    try {
      if (eventType === 'NHL') {
        const today = format(new Date(), 'yyyy-MM-dd');
        const nextWeek = format(
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          'yyyy-MM-dd'
        );
        const games = await getNHLSchedule(today, nextWeek);
        setNhlGames(games);
      } else {
        const tournaments = await getPGATournaments();
        setPgaTournaments(tournaments);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEvents();
  }, [eventType]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const renderNHLGames = () => {
    return nhlGames.map((game) => (
      <Card key={game.gamePk} style={styles.eventCard}>
        <Card.Content>
          <Text variant="titleMedium">
            {game.teams.away.team.name} vs {game.teams.home.team.name}
          </Text>
          <Text variant="bodyMedium">
            {format(new Date(game.gameDate), 'MMM d, yyyy h:mm a')}
          </Text>
          {game.status.abstractGameState === 'Final' && (
            <Text variant="bodyMedium">
              Final: {game.teams.away.score} - {game.teams.home.score}
            </Text>
          )}
        </Card.Content>
      </Card>
    ));
  };

  const renderPGATournaments = () => {
    return pgaTournaments.map((tournament) => (
      <Card key={tournament.id} style={styles.eventCard}>
        <Card.Content>
          <Text variant="titleMedium">{tournament.name}</Text>
          <Text variant="bodyMedium">
            {format(new Date(tournament.startDate), 'MMM d')} -{' '}
            {format(new Date(tournament.endDate), 'MMM d, yyyy')}
          </Text>
          <Text variant="bodyMedium">
            {tournament.course.name}, {tournament.course.location}
          </Text>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SegmentedButtons
        value={eventType}
        onValueChange={(value) => setEventType(value as 'PGA' | 'NHL')}
        buttons={[
          { value: 'PGA', label: 'PGA Events' },
          { value: 'NHL', label: 'NHL Games' },
        ]}
        style={styles.segment}
      />

      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <>{eventType === 'NHL' ? renderNHLGames() : renderPGATournaments()}</>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  segment: {
    marginBottom: 16,
  },
  eventCard: {
    marginBottom: 12,
  },
  loader: {
    marginTop: 32,
  },
});

export default Events;
