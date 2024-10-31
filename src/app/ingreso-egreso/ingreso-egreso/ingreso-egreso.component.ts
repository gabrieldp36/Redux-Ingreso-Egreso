import { Component, OnDestroy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import * as actions from '../../shared/ui.actions';
import { AppState } from '../../app.reducer';
import { SwalertService } from '../../services/swalert.service';

type Status = 'valid' | 'invalid';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrl: './ingreso-egreso.component.css',
  providers: [ TitleCasePipe ]
})
export class IngresoEgresoComponent implements OnDestroy {

  // Banderas booleanas.
  public cargando!: boolean;

  // Formulario.
  public ingresoEgresoForm!: FormGroup;
  public tipos: string[] = ['ingreso', 'egreso'];

  // Suscripciones.
  public uiSubscription!: Subscription;

  public constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>,
    private swAlert: SwalertService,
    private titleCase: TitleCasePipe

  ) {
    // Suscripción al ui state.
    this.uiSubscription =  this.store.select('ui').subscribe( state => this.cargando = state.isLoading );

    // Formulario de ingreso y egreso.
    this.ingresoEgresoForm = this.formBuilder.group({
      descripcion: [ '', [ Validators.required ] ],
      monto: [ null, [ Validators.required, Validators.min(1) ] ],
      tipo: [ null, [ Validators.required ] ]
    });
  };

  public validarCampos(campo: string, status: Status): boolean {
    return (this.ingresoEgresoForm.get(campo)![status]
      && this.ingresoEgresoForm.get(campo)?.touched )
        ?  true : false;
  };


  public getErrorMsg(control: string): string {
    if(this.ingresoEgresoForm.get(control)?.touched) {
      if( this.ingresoEgresoForm.get(control)?.getError('required') ) {
        return 'El campo es obligatorio';
      } else if( this.ingresoEgresoForm.get(control)?.getError('min') ) {
        return 'Debe ingresar un valor mayor a 0';
      };
    };
    return '';
  };

  public guardar(): void {
    if( this.ingresoEgresoForm.invalid ) { return; };

    // Activamos la bandera de carga.
    this.store.dispatch(actions.isLoading());

    // Guardamos el ingreso / egreso.
    const { descripcion, monto, tipo } = this.ingresoEgresoForm.value
    const { uid, ...ingresoEgreso } = new IngresoEgreso(descripcion, monto, tipo);
    
    // Si la inserción se realiza con éxito, avisamos mendiante un alert.
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( (_) => {
      this.store.dispatch(actions.stopLoading());
      this.swAlert.crearToast(`¡${this.titleCase.transform(tipo)} registrado!`, 'success');
      this.reset();
    })
    .catch( (error) => {
      this.store.dispatch(actions.stopLoading());
      console.error(error);
      this.swAlert.dialogoSimple('error', 'Ha ocurrido un error', 'No se ha podido registrar el ingreso. Intente nuevamente en unos minutos.');
    });
  };

  public reset(): void {
    this.ingresoEgresoForm.reset();
    this.ingresoEgresoForm.markAsUntouched();
  };

  public ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  };
}
