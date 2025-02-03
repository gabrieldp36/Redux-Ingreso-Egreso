// Módulos.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { IngresoEgresoRoutingModule } from './ingreso-egreso-routing.module';

// Componentes.
import { HomeComponent } from './home/homecomponent';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';

// Ng2Chart
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

// Pipes.
import { OrdenIngresoEgresoPipe } from './pipes/orden-ingreso-egreso.pipe';
import { ingresoEgresoReducer } from '../store/reducers/ingreso-egreso.reducer';

@NgModule({
  declarations: [
    HomeComponent,
    IngresoEgresoComponent,
    DashboardComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    IngresoEgresoRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    BaseChartDirective,
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
  ]
})
export class IngresoEgresoModule { }
