import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { SwalertService } from '../../services/swalert.service';
import * as uiActions from '../../store/actions/ui.actions';
import { AppStateWithIngreso } from '../../store/reducers/ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
  providers: [ TitleCasePipe ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  // Banderas booleanas.
  public cargando!: boolean;

  // Ingresos-Egresos.
  public ingresosEgresos: IngresoEgreso[] = [];
  public ingresoEgresoSeleccionado: string = '';

  // Suscripciones.
  public ingresosEgresosSubs!: Subscription;
  public uiSubscription!: Subscription;

  public constructor( 
    private store: Store<AppStateWithIngreso>, 
    private ingresoEgresoService: IngresoEgresoService,
    private swAlert: SwalertService,
    private titleCase: TitleCasePipe
  ) {};

  public ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresoEgreso').subscribe( ( { items } ) => this.ingresosEgresos = items );
    this.uiSubscription =  this.store.select('ui').subscribe( state => this.cargando = state.isLoading );
  };

  public borrar(ingresoEgreso: IngresoEgreso) {
    this.swAlert.crearDialogoConfirmacion('¿Está seguro?', `Está por eliminar el ${ingresoEgreso.tipo} '${ingresoEgreso.descripcion}'.`)
    .then((result: any) => {
      if (result.isConfirmed) {
        this.ingresoEgresoSeleccionado = ingresoEgreso.uid!;
        this.store.dispatch(uiActions.isLoading());
        this.ingresoEgresoService.borrarIngresoEgreso(ingresoEgreso.uid!)
        .then( (_) => {
          this.store.dispatch(uiActions.stopLoading());
          this.swAlert.crearToast(`¡${this.titleCase.transform(ingresoEgreso.tipo)} eliminado!`, 'success');
        })
        .catch( (error) => {
          this.store.dispatch(uiActions.stopLoading());
          console.error(error);
          this.swAlert.dialogoSimple('error', 'Ha ocurrido un error', 'No se ha podido eliminar el ingreso. Intente nuevamente en unos minutos.');
        });
      };
    });
  };

  public ngOnDestroy(): void {
    this.ingresosEgresosSubs?.unsubscribe();
    this.uiSubscription?.unsubscribe();
  };
}
