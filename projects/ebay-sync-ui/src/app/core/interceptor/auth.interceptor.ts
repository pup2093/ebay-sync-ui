import { inject } from '@angular/core';
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const oauthService: OAuthService = inject(OAuthService);
  const token = oauthService.getAccessToken();

  if (token) {
    const authReq = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
    return next(authReq);
  }
  return next(request);
};
