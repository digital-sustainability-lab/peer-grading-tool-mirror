import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { TokenService } from '../services/token.service';
/**
 * The login interceptor sends the JWT with almost every request to the backend.
 */
@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // setting up variables
    const token = this.tokenService.getToken();
    const isApiUrl = request.url.startsWith(environment.api);
    const isRefresh = request.url.endsWith('auth/refresh');
    const skipAuth = request.headers.has('skipAuth');

    // checking if there is a token and the request goes to the backend
    // skipAuth is used for public requests like the links that peers get
    if (token && isApiUrl && !skipAuth) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      // the refresh token is used if a refresh is needed
      if (isRefresh) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.tokenService.getRefreshToken()}`,
          },
        });
      }
    }

    // next up is the error interceptor
    return next.handle(request);
  }
}
