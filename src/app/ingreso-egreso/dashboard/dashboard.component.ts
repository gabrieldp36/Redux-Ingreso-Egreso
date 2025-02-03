import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppStateWithIngreso } from '../../store/reducers/ingreso-egreso.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Propiedades.
  public ingresos!: number;
  public egresos!: number
  public totalIngresos!: number;
  public totalEgresos!: number;

  // Suscripciones.
  public ingresosEgresosSubs!: Subscription;

  // Gráfica.
  public doughnutChartLabels: string[] = [
    'Ingresos',
    'Egresos',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // Constructor.
  public constructor( private store: Store<AppStateWithIngreso>) {};

  // Hooks.
  public ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresoEgreso').subscribe( ( { items } ) => this.generarEstadistica( items ) );
  };

  public ngOnDestroy(): void {
    this.ingresosEgresosSubs?.unsubscribe();
  };

  // Métodos.
  public generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    items.forEach( item => {
      if(item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      };
    });
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [ {data: [this.totalIngresos, this.totalEgresos] } ],
    };
  };
}
