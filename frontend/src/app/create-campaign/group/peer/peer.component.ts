import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CampaignStatus, Group, Peer } from '../../../interfaces';
import { CreateCampaignComponent } from '../../create-campaign.component';
import { CampaignService } from '../../../services/campaign.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCampaignService } from '../../create-campaign.service';

@Component({
  selector: '[pgt-peer]',
  templateUrl: './peer.component.html',
  styleUrls: ['../../../app.component.css', './peer.component.css'],
})
export class PeerComponent implements OnInit {
  @Input('peer') peer: Peer;
  @Input('group') group: Group;
  @Input('campaignStatus') campaignStatus: CampaignStatus;
  peerEditForm: FormGroup;

  constructor(
    private createCampaignService: CreateCampaignService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.peerEditForm = this.formBuilder.group({
      peerId: [this.peer.peerId, Validators.required],
      firstName: [this.peer.firstName, Validators.required],
      lastName: [this.peer.lastName, Validators.required],
      matriculationNumber: [this.peer.matriculationNumber],
      email: [
        this.peer.email,
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,5}$"
          ),
        ],
      ],
    });

    if (this.campaignStatus == 'abgeschlossen') {
      this.peerEditForm.disable();
    }

    // TODO: ideas to improve this hacky thing
    // store focused input
    // formbuilder update variable on change

    this.peerEditForm.valueChanges.subscribe((peer: Peer) => {
      this.createCampaignService.updateUnsavedChanges(true, 'peer edited');
      for (let key in peer) {
        (this.peer as any)[key] = (peer as any)[key];
      }
    });
  }

  removePeer() {
    this.createCampaignService.removePeer(this.group, this.peer);
  }
}
