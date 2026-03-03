import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = () => {
  
  const cookies =  inject(CookieService)
  const router = inject(Router)

  if (cookies.get('token')) {
    return true
  }else{
    return router.parseUrl('/login')
  }

};
