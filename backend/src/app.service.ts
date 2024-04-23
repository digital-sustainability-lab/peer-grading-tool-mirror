import { Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5';

@Injectable()
export class AppService {
  generateLink(groupId: number, peerId: number) {
    return Md5.hashStr(groupId + '-' + peerId) + groupId + peerId;
  }

  formatLocaleDate(date: Date, lang: string): string {
    if (lang == 'en') {
      return date.toLocaleDateString(lang, {
        timeZone: 'Europe/Zurich',
        dateStyle: 'medium',
      });
    } else {
      return date.toLocaleDateString(lang, { timeZone: 'Europe/Zurich' });
    }
  }
}
