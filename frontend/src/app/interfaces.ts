import { Observable } from 'rxjs';

export interface Campaign {
  campaignId: number;
  name: string;
  maxPoints: number;
  openingDate?: Date;
  language: Language;
  closingDate?: Date;
  creationDate: Date;
  criteria: Criteria[];
  groups: Group[];
  users?: User[];
}

export type CampaignStatus = 'erstellt' | 'läuft' | 'abgeschlossen';

export type Language = 'de' | 'en';

export interface MailsSent {
  peerMailsSent: number;
  adminMailsSent: number;
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
  fromPeerId?: number;
  toPeerId?: number;
  points: number;
  timestamp: Date;
}

export interface PeerComment {
  fromPeer: Peer;
  toUser: User;
  text: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRole[];
  password?: string;
  campaigns?: Campaign[];
  peer?: Peer | null;
  company?: string;
}

export enum UserRole {
  ADMIN,
  PEER,
  SUPER,
}

// data transport specific interfaces
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  emailRepeat: string;
  password: string;
  passwordRepeat: string;
  company?: string;
}

// frontend specific interfaces

export interface DeactivatableComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}
