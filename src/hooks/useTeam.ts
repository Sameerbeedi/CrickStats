import { useState, useEffect } from 'react';
import { Team } from '../types/database';
import { db } from '../services/db';

export const useTeam = (teamId?: string) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!teamId) return;

    const fetchTeam = async () => {
      try {
        setLoading(true);
        const result = await db.queryOne<Team>(
          'SELECT * FROM Team WHERE Team_ID = ?',
          [teamId]
        );
        setTeam(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  const createTeam = async (teamData: Omit<Team, 'Team_ID'>) => {
    try {
      setLoading(true);
      const result = await db.query(
        'INSERT INTO Team SET ?',
        [teamData]
      );
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTeam = async (teamId: string, teamData: Partial<Team>) => {
    try {
      setLoading(true);
      const result = await db.query(
        'UPDATE Team SET ? WHERE Team_ID = ?',
        [teamData, teamId]
      );
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { team, loading, error, createTeam, updateTeam };
};