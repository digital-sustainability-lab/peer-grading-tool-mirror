import { Injectable, WritableSignal, signal } from '@angular/core';
import { Group } from '../interfaces';
import { CampaignService } from '../services/campaign.service';

interface LineValidation {
  valid: boolean;
  invalidMessage?: string;
}

/**
 * This service is used when importing CSV data
 */
@Injectable({
  providedIn: 'root',
})
export class CsvService {
  csvErrors: WritableSignal<string[]> = signal([]);

  constructor(private campaignService: CampaignService) {}

  /**
   * this method generates the groups from the CSV
   * @param csv the CSV as a string
   */
  generateGroupsByCSV(csv: string) {
    this.csvErrors.set([]);

    let groups: Group[] = [];
    let lines = csv.split(/\r?\n/);

    for (let [index, line] of lines.entries()) {
      if (index !== 0 && line != '') {
        // skipping the first line and empty lines

        const splittedLine = this.splitLine(line);

        if (splittedLine.length != 5) {
          this.csvErrors.update((value: string[]) => [
            ...value,
            $localize`Ist das CSV gemäss der Vorlage aufgebaut?`,
          ]);
          return [];
        }

        // storing the values
        const lastName = splittedLine[0].trim();
        const firstName = splittedLine[1].trim();
        const matriculationNumber = splittedLine[2].trim();
        const email = splittedLine[3].trim();
        const groupNumberString: string = splittedLine[4].trim();

        // checking if the values are valid and storing them in a group
        // else pushing this line to the errors to display
        const lineValidation: LineValidation = this.validateLine(
          lastName,
          firstName,
          email,
          groupNumberString
        );

        if (lineValidation.valid) {
          const groupNumber: number = Number(groupNumberString);

          let foundGroup = groups.find((gr) => gr.number == groupNumber);

          if (!foundGroup) {
            foundGroup = this.campaignService.groupConstructor(groupNumber);
            groups.push(foundGroup);
          }

          this.campaignService.addPeer(
            foundGroup,
            this.campaignService.peerConstructor(
              firstName,
              lastName,
              email,
              matriculationNumber
            )
          );
        } else {
          this.csvErrors.update((value: string[]) => [
            ...value,
            $localize`Zeile` +
              ` ${index + 1} (${splittedLine.join(' | ')}): ${
                lineValidation.invalidMessage
              }`,
          ]);
        }
      }
    }

    groups = this.updateGroupNumbers(groups);

    return groups;
  }

  private splitLine(line: string): string[] {
    // checking for semicolons, commas or tabs as separators
    let splittedLine = line.split(';');
    if (splittedLine.length != 5) {
      splittedLine = line.split(',');
    }
    if (splittedLine.length != 5) {
      splittedLine = line.split('\t');
    }
    return splittedLine;
  }

  private validateLine(
    lastName: string,
    firstName: string,
    email: string,
    groupNumber: string
  ): LineValidation {
    const lastNameValid = lastName.length !== 0;
    const firstNameValid = firstName.length !== 0;
    const emailValid =
      email.match(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,5}$"
      ) != null;
    const groupNumberValid = groupNumber.match('^\\d+$') != null;

    let invalidMessages: string[] = [];

    if (!lastNameValid) invalidMessages.push($localize`kein Nachname`);
    if (!firstNameValid) invalidMessages.push($localize`kein Vorname`);
    if (!emailValid) invalidMessages.push($localize`invalide E-mail Adresse`);
    if (!groupNumberValid)
      invalidMessages.push($localize`invalide Gruppennummer`);

    return {
      valid: lastNameValid && firstNameValid && emailValid && groupNumberValid,
      invalidMessage: `${invalidMessages.join(', ')}.`,
    };
  }

  private updateGroupNumbers(groups: Group[]): Group[] {
    // sorting according to group number
    const sortedGroups = groups.sort((a, b) => a.number - b.number);
    // find max group number
    const maxGroupNumber = sortedGroups[sortedGroups.length - 1]?.number || 0;

    // autonumbering if max is higher than the number of groups
    // meaning that a group number was missing
    if (maxGroupNumber !== groups.length) {
      this.campaignService.autoNumberGroups(groups);
      this.csvErrors.update((errors) => [
        ...errors,
        $localize`Hinweis: Die Gruppen wurden automatisch nummeriert.`,
      ]);
    }

    return sortedGroups;
  }
}
