import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import * as actions from '../ingreso-egreso/ingreso-egreso.actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  public usuarioAutenticado: Usuario|null = null;
  public authSubscription!: Subscription;
  public ingresosEgresosSubs!: Subscription;

  public constructor( 
    private store:Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {};
 
  public ngOnInit(): void {
    this.authSubscription = this.store.select('auth')
    // Filtramos el null y nos asguramos tener un usuario. Se llega al susbscribe cuando tengamos un usuario.
    .pipe( filter( usuario => usuario != null ) )
    .subscribe( ( { usuario } ) => {
      this.usuarioAutenticado = usuario;
      this.ingresosEgresosSubs = this.ingresoEgresoService.initIngresoEgresoListener(usuario?.uid!)
      .subscribe( ingresosEgresos => this.store.dispatch( actions.setItems( { items: ingresosEgresos } ) ) );
    });
  };

  public ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.ingresosEgresosSubs?.unsubscribe();
  };
}
