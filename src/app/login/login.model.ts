export interface LoginCredentials {
  username: string;
  password: string;
}

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';
