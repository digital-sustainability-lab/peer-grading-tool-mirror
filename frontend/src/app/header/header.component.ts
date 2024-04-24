import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'pgt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User | null;

  constructor(
    public router: Router,
    public userService: UserService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  logout() {
    this.userService.logout();
  }
}
