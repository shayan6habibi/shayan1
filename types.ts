
export enum View {
  HOME = 'HOME',
  SERVERS = 'SERVERS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  ISSUES = 'ISSUES',
  SETTINGS = 'SETTINGS'
}

export interface Server {
  id: string;
  name: string;
  country: string;
  latency: number;
  protocol: string;
  flag: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface SubscriptionData {
  servers: Server[];
  rawText: string;
}
