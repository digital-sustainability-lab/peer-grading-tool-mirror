import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAdminUserComponent } from './create-admin-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorComponent } from '../form-error/form-error.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CreateUserComponent', () => {
  let component: CreateAdminUserComponent;
  let fixture: ComponentFixture<CreateAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        RouterModule.forRoot([]),
        MatIconModule,
      ],
      declarations: [CreateAdminUserComponent, FormErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
