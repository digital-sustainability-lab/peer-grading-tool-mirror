export interface Campaign {
  campaignId: number;
  name: string;
  maxPoints: number;
  creationDate: Date;
  openingDate?: Date;
  closingDate?: Date;
  criteria: Criteria[];
  groups: Group[];
  users: User[];
}

export type CampaignStatus = 'erstellt' | 'läuft' | 'abgeschlossen';

export interface MailsSent {
  peerMailsSent: number;
  adminMailsSent: number;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  campaigns?: Campaign[];
  Peer?: Peer;
  company?: string;
}

export interface Group {
  groupId: number;
  number: number;
  peers: Peer[];
  gradings: Grading[];
  completed: boolean;
  comments: PeerComment[];
}

export interface Criteria {
  criteriaId: number;
  name: string;
  weight: number;
}

export interface Peer {
  peerId: number;
  firstName: string;
  lastName: string;
  matriculationNumber?: string;
  email: string;
}

export interface Grading {
  criteria: Criteria;
  fromPeer: Peer;
  toPeer: Peer;
  points: number;
  timestamp: Date;
}

export interface PeerComment {
  fromPeer: Peer;
  toUser: User;
  text: string;
}

export interface RegisterData {
  email: string;
  emailRepeat: string;
  password: string;
  passwordRepeat: string;
  firstName: string;
  lastName: string;
  company?: string;
}
