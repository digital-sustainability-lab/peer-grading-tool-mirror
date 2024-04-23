import { Component, Input, OnInit } from '@angular/core';
import { Campaign, CampaignStatus, Group } from '../interfaces';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'pgt-group-meta',
  templateUrl: './group-meta.component.html',
  styleUrls: ['./group-meta.component.css'],
})
export class GroupMetaComponent implements OnInit {
  @Input('campaign') campaign: Campaign;
  @Input('group') group: Group;
  @Input('showCriteria') showCriteria: boolean = true;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {}

  getCampaignStatus(): CampaignStatus {
    return this.campaignService.getCampaignStatus(this.campaign);
  }
}
