import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfReviewComponent } from './pdf-review.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PdfReviewComponent', () => {
  let component: PdfReviewComponent;
  let fixture: ComponentFixture<PdfReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, RouterModule.forRoot([])],
      declarations: [PdfReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
