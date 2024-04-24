import { inject } from '@angular/core';
import { Criteria } from '../interfaces';
import { CampaignService } from 'src/app/services/campaign.service';

const campaignService: CampaignService = new CampaignService();

export const DEFAULT_CRITERIA: { de: Criteria[]; en: Criteria[] } = {
  de: [
    campaignService.criteriaConstructor('Teamfähigkeit', 1, 0),
    campaignService.criteriaConstructor('Qualität', 1, 0),
    campaignService.criteriaConstructor('Quantität', 1, 0),
    campaignService.criteriaConstructor('Zuverlässigkeit', 1, 0),
  ],
  en: [
    campaignService.criteriaConstructor('Teamworking skills', 1, 0),
    campaignService.criteriaConstructor('Quality', 1, 0),
    campaignService.criteriaConstructor('Quantity', 1, 0),
    campaignService.criteriaConstructor('Reliability', 1, 0),
  ],
};
