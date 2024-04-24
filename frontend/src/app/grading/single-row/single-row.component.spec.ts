import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRowComponent } from './single-row.component';
import { GradingComponent } from '../grading.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('SingleRowComponent', () => {
  let component: SingleRowComponent;
  let fixture: ComponentFixture<SingleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        RouterModule.forRoot([]),
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [SingleRowComponent],
      providers: [GradingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
