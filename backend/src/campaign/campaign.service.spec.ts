import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AppService } from '../app.service';
import { PrismaService } from '../prisma.service';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { CampaignService } from './campaign.service';

jest.mock('../sendgrid/sendgrid.service');
// jest.mock('../prisma.service');
jest.mock('../app.service');
describe('CampaignService', () => {
  let service: CampaignService;
  let prisma: PrismaService;
  let sendgrid: SendgridService;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CampaignService, PrismaService, SendgridService, AppService],
    }).compile();
    service = app.get<CampaignService>(CampaignService);
    prisma = app.get<PrismaService>(PrismaService);
    sendgrid = app.get<SendgridService>(SendgridService);
    appService = app.get<AppService>(AppService);
  });

  describe('getCampaignByUser', () => {
    let spyFindMany: jest.SpyInstance;
    beforeEach(() => {
      spyFindMany = jest
        .spyOn(prisma.campaign, 'findMany')
        .mockResolvedValue([]);
    });
    it('calls findMany with email and selects', async () => {
      await service.getCampaignsByUser('t@t.com');
      expect(spyFindMany).toHaveBeenCalledWith({
        select: {
          campaignId: true,
          maxPoints: true,
          name: true,
          openingDate: true,
          closingDate: true,
          groups: true,
        },
        where: {
          users: {
            some: {
              email: 't@t.com',
            },
          },
        },
      });
    });
  });

  describe('upsertCampaign', () => {
    let spyTransaction: jest.SpyInstance;
    let data;
    beforeEach(() => {
      spyTransaction = jest
        .spyOn(prisma, '$transaction')
        .mockImplementation(jest.fn());
      data = {
        user: {
          email: 'mail@example.ch',
        },
        campaignId: 0,
        name: 'Hello',
        maxPoints: 8,
        openingDate: '2023-01-30T23:00:00.000Z',
        closingDate: '2023-02-07T22:59:59.000Z',
        groups: [
          {
            groupId: 0,
            number: 1,
            peers: [
              {
                peerId: 0,
                firstName: 'Ted',
                lastName: 'Test',
                matriculationNumber: '87-698-123',
                email: 'peer1@example.ch',
              },
              {
                peerId: 0,
                firstName: 'Blabla',
                lastName: 'Bla',
                matriculationNumber: '09-465-222',
                email: 'peer2@example.ch',
              },
            ],
            gradings: [],
            completed: false,
            comments: [],
          },
          {
            groupId: 0,
            number: 2,
            peers: [
              {
                peerId: 0,
                firstName: 'Lio',
                lastName: 'Schak',
                matriculationNumber: '49-632-747',
                email: 'peer4@example.ch',
              },
            ],
            gradings: [],
            completed: false,
            comments: [],
          },
        ],
        criteria: [
          {
            criteriaId: 0,
            name: 'Teamfähigkeit',
            weight: 1,
          },
          {
            criteriaId: 0,
            name: 'Qualität',
            weight: 1,
          },
          {
            criteriaId: 0,
            name: 'Quantität',
            weight: 1,
          },
          {
            criteriaId: 0,
            name: 'Zuverlässigkeit',
            weight: 1,
          },
        ],
      };
    });
  });
});
