import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { SwalertService } from '../../services/swalert.service';
import { AppState } from '../../app.reducer';
import * as actions from '../../shared/ui.actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  // Banderas booleanas.
  public focusEmail: boolean = false;
  public focusPassword: boolean = false;
  public cargando!: boolean;

  // Formularios.
  public loginForm: FormGroup;

  // Usuario Autenticado.
  public usuarioAutenticado: Usuario|null = null;

  // Suscripciones.
  public uiSubscription!: Subscription;
  public authSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private swAlert: SwalertService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      correo: [ 'test1@test.com', [ Validators.required, Validators.email ] ],
      password: [ 'Test123456', [Validators.required] ]
    });
    this.loginForm.markAllAsTouched();
  };

  public ngOnInit(): void {
   this.uiSubscription =  this.store.select('ui').subscribe( state => this.cargando = state.isLoading );
  };

  public getClassIconInput(control: string): string {
    if(this.loginForm.get(control)?.untouched) {
      return 'fa fa-check-circle color-gray';
    } else if(this.loginForm.get(control)?.valid) {
      return 'fa fa-check-circle color-green';
    } else {
      return 'fa fa-solid fa-circle-xmark color-red';
    };
  };

  public getErrorMsg(control: string): string {
    if(this.loginForm.get(control)?.touched) {
      if( this.loginForm.get(control)?.getError('required') ) {
        return 'El campo es obligatorio';
      } else if( this.loginForm.get(control)?.getError('email') ) {
        return 'Ingrese un correo válido';
      }
    };
    return '';
  };

  public loguearUsuario(): void {
    // Logueo del usuario con Firebase.
    this.store.dispatch(actions.isLoading());
    this.authService.loguearUsuario( { ...this.loginForm.value } )
    .then( (_) => {
      this.authSubscription = this.store.select('auth').subscribe( usuarioAuth => { 
        if(usuarioAuth.usuario) {
          this.store.dispatch(actions.stopLoading());
          this.router.navigate(['/home/dashboard']);
          this.swAlert.crearToast('¡Login exitoso!', 'success');
        };
      });
    })
    .catch( error => {
      this.store.dispatch(actions.stopLoading());
      console.log(error);
      this.swAlert.dialogoSimple('error', '¡Ha ocurrido un error!', 'Correo o password incorrecto.');
    });
  };

  public ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  };
}
