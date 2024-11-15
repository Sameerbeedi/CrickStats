import { useState, useEffect } from 'react';
import { Coach } from '../types/database';
import { db } from '../services/db';

export const useCoach = (coachId?: string) => {
  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!coachId) return;

    const fetchCoach = async () => {
      try {
        setLoading(true);
        const result = await db.queryOne<Coach>(
          'SELECT * FROM Coach WHERE Coach_ID = ?',
          [coachId]
        );
        setCoach(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [coachId]);

  const createCoach = async (coachData: Omit<Coach, 'Coach_ID'>) => {
    try {
      setLoading(true);
      const result = await db.query(
        'INSERT INTO Coach SET ?',
        [coachData]
      );
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCoach = async (coachId: string, coachData: Partial<Coach>) => {
    try {
      setLoading(true);
      const result = await db.query(
        'UPDATE Coach SET ? WHERE Coach_ID = ?',
        [coachData, coachId]
      );
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { coach, loading, error, createCoach, updateCoach };
};