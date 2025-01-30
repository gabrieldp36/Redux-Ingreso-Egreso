// Módulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatch } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {
    path:'home',
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then( m => m.IngresoEgresoModule),
    canMatch: [ canMatch ]  
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
