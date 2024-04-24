import { Pipe, PipeTransform } from '@angular/core';
import { CampaignStatus } from '../interfaces';

@Pipe({
  name: 'campaignStatus',
  standalone: false,
})
export class CampaignStatusPipe implements PipeTransform {
  transform(status: CampaignStatus, ...args: unknown[]): String {
    switch (status) {
      case 'erstellt':
        return $localize`erstellt`;
      case 'läuft':
        return $localize`läuft`;
      case 'abgeschlossen':
        return $localize`abgeschlossen`;
      default:
        return status;
    }
  }
}
