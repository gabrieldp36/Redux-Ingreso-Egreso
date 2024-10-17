import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  // Injección de dependencias.
  const authService = inject(AuthService);
  const router = inject(Router);

  // Manejamos el comportamiento del auth guard.
  return authService.isAuth().pipe( 
    tap ( autenticado => {
      if(!autenticado) {
        router.navigate(['/login']);
      };
    }),
  );
};
