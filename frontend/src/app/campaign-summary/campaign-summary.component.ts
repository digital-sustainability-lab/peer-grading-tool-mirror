import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '../interfaces';
import { PGTService } from '../services/pgt.service';
import { SnackBarService } from '../services/snack-bar.service';
import { CampaignService } from '../services/campaign.service';
import { HttpErrorResponse } from '@angular/common/http';

const pdfFonts = require('../../assets/fonts');
//pdfMake.vfs = pdfFonts.pdfMake.vfs;
/**
 * this component displays all data of a single campaign. only accessible for admin users
 * it has a child component to display each individual group in the campaign
 */
@Component({
  selector: 'pgt-campaign-summary',
  templateUrl: './campaign-summary.component.html',
  styleUrls: ['./campaign-summary.component.css', '../app.component.css'],
})
export class CampaignSummaryComponent implements OnInit {
  campaignId: WritableSignal<number> = signal(
    this.activatedRoute.snapshot.params['id']
  );
  campaign: WritableSignal<Campaign | undefined> = signal(undefined);

  constructor(
    public pgtService: PGTService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.pgtService.getCampaignById(this.campaignId()).subscribe({
      next: (campaign) => {
        // cleaning up campaigndata
        this.campaign.set(this.campaignService.cleanupCampaignData(campaign));
      },
      error: (error: HttpErrorResponse) => {
        this.snackBarService.openErrorBar(error);
        this.router.navigate(['/admin-dashboard']);
      },
    });
  }

  onReloadEvent(value: string) {
    if (value == 'delete') {
      this.router.navigate(['/admin-dashboard']);
      return;
    }

    this.ngOnInit();
  }
}
