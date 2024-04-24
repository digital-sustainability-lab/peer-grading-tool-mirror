import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerComponent } from './peer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorComponent } from '../../../form-error/form-error.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('PeerComponent', () => {
  let component: PeerComponent;
  let fixture: ComponentFixture<PeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
      ],
      declarations: [PeerComponent, FormErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
