import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from '../../interfaces';

@Component({
  selector: 'pgt-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  @Input('campaign') campaign: Campaign;
  @Input('viewState') viewState: 'dashboard' | 'summary';
  @Output() reloadEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onReloadEvent(value: string) {
    this.reloadEvent.emit(value);
  }
}
