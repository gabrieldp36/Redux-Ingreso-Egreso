import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from './home/homecomponent';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso/ingreso-egreso.component";
import { DetalleComponent } from "./detalle/detalle.component";

export const ingresoEgresoRoutes: Routes = [
  {   
    path: '', 
    component: HomeComponent ,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ingreso-egreso', component: IngresoEgresoComponent },
      { path: 'detalle', component: DetalleComponent },  
      { path: '**', redirectTo: 'dashboard'}
    ],
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ingresoEgresoRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class IngresoEgresoRoutingModule { }
