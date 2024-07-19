import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserInfoService } from '../../core/service/user-info.service';

export function setupLayoutGuard(): CanMatchFn {
  return () => {
    const userInfoService = inject(UserInfoService);
    const router = inject(Router);

    return userInfoService.getUserInfo().pipe(
      map((userInfo) => {
        if (!userInfo.initiated) {
          return true;
        }
        return router.parseUrl('/app/sync');
      }),
    );
  };
}
