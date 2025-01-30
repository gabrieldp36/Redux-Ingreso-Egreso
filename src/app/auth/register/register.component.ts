import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { SwalertService } from '../../services/swalert.service';
import { TooltipService } from '../../services/tooltip.service';
import { AppState } from '../../app.reducer';
import * as actions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  // Banderas booleanas.
  public focusUsuario: boolean = false;
  public focusEmail: boolean = false;
  public focusPassword: boolean = false;
  public cargando!: boolean;

  // Formularios.
  public registroForm: FormGroup;
  public passwordPatron: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  public emailPatron: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;

  // Suscripciones.
  public uiSubscription!: Subscription;
  public authSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private swAlert: SwalertService,
    private tooltipService: TooltipService,
    private store: Store<AppState>
  ) {
    this.registroForm = this.fb.group({
      nombre: [ '', Validators.required ],
      correo: [ '', [ Validators.required, Validators.pattern(this.emailPatron) ] ],
      password: [ '', [Validators.required, Validators.pattern(this.passwordPatron)] ]
    });
  };

  public ngOnInit(): void {
    this.uiSubscription =  this.store.select('ui').subscribe( state => this.cargando = state.isLoading );
    this.tooltipService.tooltipInit();
  };

  public getClassIconInput(control: string): string {
    if(this.registroForm.get(control)?.untouched) {
      return 'fa fa-check-circle color-gray';
    } else if(this.registroForm.get(control)?.valid) {
      return 'fa fa-check-circle color-green';
    } else {
      return 'fa fa-solid fa-circle-xmark color-red';
    };
  };

  public getErrorMsg(control: string): string {
    if(this.registroForm.get(control)?.touched) {
      if( this.registroForm.get(control)?.getError('required') ) {
        return 'El campo es obligatorio';
      } else if( this.registroForm.get(control)?.getError('pattern') && control === 'correo') {
        return 'Ingrese un correo válido';
      } else if( this.registroForm.get(control)?.getError('pattern') && control === 'password') {
        return 'La contraseña debe contener mínimo 8 caractéres, al menos una letra mayúscula, una letra minúscula y un número.';
      };
    };
    return '';
  };

  public crearUsuario(): void {
    // Creación del usuario en Firebase.
    this.store.dispatch(actions.isLoading());
    this.authService.crearUsuario( { ...this.registroForm.value } )
    .then( usuario => {
      this.authSubscription = this.store.select('auth').subscribe( usuarioAuth => { 
        if(usuarioAuth.usuario) {
          this.store.dispatch(actions.stopLoading());
          this.router.navigate(['/home/dashboard']);
          this.swAlert.crearToast('¡Usuario creado!', 'success');
        };
      });
    })
    .catch( error => {
      this.store.dispatch(actions.stopLoading());
      console.log(error) 
      this.swAlert.dialogoSimple('error', '¡Ha ocurrido un error!', 'No se ha podido crear al usuario.');
    });
  };

  public ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  };
}
