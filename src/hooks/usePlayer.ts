import { useState, useEffect } from 'react';
import { Player } from '../types/database';
import { db } from '../services/db';

export const usePlayer = (playerId?: string) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!playerId) return;

    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const result = await db.queryOne<Player>(
          'SELECT * FROM Player WHERE Player_ID = ?',
          [playerId]
        );
        setPlayer(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const createPlayer = async (playerData: Omit<Player, 'Player_ID'>) => {
    try {
      setLoading(true);
      const result = await db.query(
        'INSERT INTO Player SET ?',
        [playerData]
      );
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlayer = async (playerId: string, playerData: Partial<Player>) => {
    try {
      setLoading(true);
      const result = await db.query(
        'UPDATE Player SET ? WHERE Player_ID = ?',
        [playerData, playerId]
      );
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { player, loading, error, createPlayer, updatePlayer };
};