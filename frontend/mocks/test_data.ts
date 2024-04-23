import {
  Campaign,
  Group,
  Grading,
  Criteria,
  Peer,
} from '../src/app/interfaces';

let peer1: Peer = {
  peerId: 10,
  firstName: 'testName',
  lastName: 'testLastName',
  matriculationNumber: '13123',
  email: 'test@mail.ch',
};

let peer2: Peer = {
  peerId: 11,
  firstName: 'testName',
  lastName: 'testLastName',
  matriculationNumber: '13123',
  email: 'test@mail.ch',
};

let input_criteria1: Criteria = {
  criteriaId: 1,
  name: 'TestCriteria1',
  weight: 10,
};
let input_criteria2: Criteria = {
  criteriaId: 2,
  name: 'TestCriteria2',
  weight: 15,
};

export const input_gradings: Partial<Grading> = {
  criteria: input_criteria1,
  fromPeer: peer1,
};

export const input_group: Group = {
  groupId: 10,
  number: 15,
  peers: [peer1, peer2],
  gradings: [],
  completed: true,
  comments: [],
};

export const input_campaign: Campaign = {
  campaignId: 1200,
  name: 'Test',
  maxPoints: 100,
  language: 'de',
  creationDate: new Date(),
  criteria: [input_criteria1, input_criteria2],
  groups: [input_group],
};
