import { Injectable } from '@angular/core';

/**
 * this service handles everything regarding the JWT or the refresh token
 */
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  signOut(): void {
    window.sessionStorage.clear();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  hasToken(): boolean {
    return localStorage.getItem('accessToken') !== null
  }
}
