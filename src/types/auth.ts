export type UserRole = 'Admin' | 'Player' | 'Coach' | 'Fan';

export interface User {
  User_ID: string;
  Username: string;
  User_Role: UserRole;
  User_Email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}