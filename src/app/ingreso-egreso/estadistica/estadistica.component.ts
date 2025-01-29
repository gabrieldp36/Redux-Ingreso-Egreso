import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent {
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
  public constructor( private store: Store<AppState>) {};

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
