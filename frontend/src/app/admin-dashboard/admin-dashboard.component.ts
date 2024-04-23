import { Component, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Campaign } from '../interfaces';
import { UserService } from '../services/user.service';
import { AdminDashboardService } from './admin-dashboard.service';
/**
 * this component is the first screen you see after login.
 * you get the exisisting campaigns and can edit or see details of them.
 * you can create a new campaign too.
 */
@Component({
  selector: 'pgt-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css', '../app.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  // a behavior subject that stores all the campaigns of the user
  campaigns: Signal<Campaign[]> = this.adminDashboardService.campaigns;

  constructor(
    private userService: UserService,
    private router: Router,
    private adminDashboardService: AdminDashboardService
  ) {}

  /**
   * upon initialization, it gets the all the campaigns of the user, that just logged in.
   */
  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(take(1))
      .subscribe(() => {
        this.adminDashboardService.reloadCampaigns();
      });
  }

  onReloadEvent(event: any) {
    this.adminDashboardService.reloadCampaigns();
  }

  createCampaign() {
    this.router.navigate(['/create-campaign/']);
  }
}
