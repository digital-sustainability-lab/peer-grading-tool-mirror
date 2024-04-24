import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerGradingReviewComponent } from './grading-review.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PeerGradingReviewComponent', () => {
  let component: PeerGradingReviewComponent;
  let fixture: ComponentFixture<PeerGradingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, RouterModule.forRoot([])],
      declarations: [PeerGradingReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeerGradingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
