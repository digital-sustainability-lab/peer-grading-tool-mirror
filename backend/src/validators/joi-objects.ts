import * as Joi from 'joi';

const userWithoutPeerSchema = Joi.object({
  userId: Joi.number().integer().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  campaigns: Joi.array(),
});

const peerSchema = Joi.object({
  peerId: Joi.number().integer().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  matriculationNumber: Joi.optional(),
  email: Joi.string().email().required(),
  userId: Joi.number().integer(),
  user: userWithoutPeerSchema,
});

const criteriaSchema = Joi.object({
  criteriaId: Joi.number().integer().required(),
  name: Joi.string().required(),
  weight: Joi.number().required(),
  campaignId: Joi.number().integer(),
  gradings: Joi.array(),
});

export const createGradingSchema = (max: number) =>
  Joi.object({
    gradingId: Joi.number(),
    timestamp: Joi.date(),
    criteria: criteriaSchema,
    fromPeer: peerSchema,
    toPeer: peerSchema,
    criteriaId: Joi.number().integer(),
    fromPeerId: Joi.number().integer(),
    toPeerId: Joi.number().integer(),
    points: Joi.number().integer().required().min(1).max(max),
  });

const userSchema = Joi.object({
  userId: Joi.number().integer().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  campaigns: Joi.array(),
  peer: peerSchema,
});

const commentPostSchema = Joi.object({
  commentId: Joi.number(),
  fromPeer: peerSchema,
  toUser: userSchema,
  text: Joi.string().required(),
});

const createGroupSchema = (maxPoints: number) =>
  Joi.object({
    groupId: Joi.number().integer().required(),
    number: Joi.number().integer().required(),
    peers: Joi.array().items(peerSchema).required(),
    gradings: Joi.array().items(createGradingSchema(maxPoints)),
    completed: Joi.bool(),
    comments: Joi.array().items(commentPostSchema),
  });

export const createCampaignSchema = (maxPoints: number) =>
  Joi.object({
    campaignId: Joi.number().integer().required(),
    name: Joi.string().required(),
    maxPoints: Joi.number().integer().min(3).required(),
    creationDate: Joi.date(),
    openingDate: Joi.date(),
    closingDate: Joi.date(),
    language: Joi.string().required(),
    groups: Joi.array().items(createGroupSchema(maxPoints)).required(),
    criteria: Joi.array().items(criteriaSchema).required(),
    users: Joi.array().items(userSchema),
  });

export const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  company: Joi.string(),
});

export const updateUserSchema = Joi.object({
  userId: Joi.number().integer().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string(),
  password: Joi.string(),
});

export const changePWSchema = Joi.object({
  password: Joi.string().required(),
});

export const createGradingsAndCommentSchema = (max: number) =>
  Joi.object({
    groupId: Joi.number().integer().required(),
    comments: Joi.object(),
    gradings: Joi.array().items(createGradingSchema(max)).required(),
  });
