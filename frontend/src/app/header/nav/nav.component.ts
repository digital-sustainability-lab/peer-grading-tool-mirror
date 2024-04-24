import { Component, Input, OnInit } from '@angular/core';
import { User, UserRole, Campaign } from 'src/app/interfaces';

@Component({
  selector: 'pgt-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() user?: User;

  UserRole = UserRole;
  campaign: Campaign;
  showPeerReview: boolean;

  constructor() {}

  ngOnInit(): void {}
}
