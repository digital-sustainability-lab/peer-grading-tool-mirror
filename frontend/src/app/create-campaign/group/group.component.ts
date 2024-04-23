import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, Campaign, Peer, CampaignStatus } from 'src/app/interfaces';
import { CampaignService } from 'src/app/services/campaign.service';
import { CreateCampaignService } from '../create-campaign.service';

@Component({
  selector: 'pgt-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../app.component.css', './group.component.css'],
})
export class GroupComponent implements OnInit {
  @Input('group') group: Group;
  @Input('campaign') campaign: Campaign;
  @Input('campaignStatus') campaignStatus: CampaignStatus;

  peerForm: FormGroup;

  constructor(private createCampaignService: CreateCampaignService) {}

  ngOnInit(): void {}

  removeGroup() {
    this.createCampaignService.removeGroup(this.group);
  }

  addPeer() {
    this.createCampaignService.addPeer(this.group);
  }
}
