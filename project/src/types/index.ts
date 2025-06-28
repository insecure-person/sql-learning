export interface Group {
  id: string;
  name: string;
  points: number;
  character: {
    type: 'athletic-woman' | 'athletic-men' | 'scholar' | 'trainer' | 'student' | 'mentor';
    expression: 'happy' | 'sleeping' | 'focused' | 'excited' | 'thinking' | 'breathing';
  };
  members: string[];
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  points: number;
  reason: string;
  timestamp: Date;
  type: 'add' | 'deduct';
}

export interface Session {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  topics: string[];
}

export interface User {
  isAdmin: boolean;
  adminCredentials?: {
    id: string;
    password: string;
  };
}