import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

export const estaAutenticado = (): Observable<boolean | UrlTree> => {

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

export const canActivate: CanActivateFn = estaAutenticado;
export const canMatch: CanMatchFn = estaAutenticado;

