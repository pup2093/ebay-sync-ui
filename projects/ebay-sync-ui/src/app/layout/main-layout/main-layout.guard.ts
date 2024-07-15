import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserInfoService } from '../../core/service/user-info.service';

export function mainLayoutGuard(): CanMatchFn {
  return (): Observable<boolean | UrlTree> => {
    const userInfoService = inject(UserInfoService);
    const router = inject(Router);
    return userInfoService.getUserInfo().pipe(
      map((userInfo) => {
        if (userInfo.initiated) {
          return true;
        }
        return router.parseUrl('/account-setup');
      }),
    );
  };
}
