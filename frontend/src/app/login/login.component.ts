import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';
import { UserService } from '../services/user.service';
/**
 * the login component handles user logins
 * currently only admin users can login
 */
@Component({
  selector: 'pgt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {}

  /**
   * upon initialization the loginform is built
   */
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams['returnUrl']) {
      this.snackBarService.openSnackBar($localize`Anmeldung erforderlich.`);
    }
    this.loginForm = this.formBuilder.group({
      email: [, [Validators.required]],
      password: [, [Validators.required]],
    });
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  /**
   * this function is used when the login button is clicked
   * @param loginForm
   */
  login(loginForm: FormGroup) {
    if (loginForm.valid) {
      const returnUrl =
        this.activatedRoute.snapshot.queryParams['returnUrl'] ||
        '/admin-dashboard';
      this.userService.login(loginForm.value, returnUrl);
    } else {
      loginForm.markAllAsTouched();
    }
  }

  /**
   * this function is used when the register button is clicked
   */
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
