import { TestBed } from '@angular/core/testing';

import { CreateCampaignService } from './create-campaign.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CreateCampaignService', () => {
  let service: CreateCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, MatDialogModule],
    });
    service = TestBed.inject(CreateCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
