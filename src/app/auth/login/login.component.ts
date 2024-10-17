import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SwalertService } from '../../services/swalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Banderas booleanas.
  public cargando: boolean = false;
  public focusEmail: boolean = false;
  public focusPassword: boolean = false;

  // Formularios.
  public loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private swAlert: SwalertService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [Validators.required] ]
    });
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
    this.cargando = true;
    this.authService.loguearUsuario( { ...this.loginForm.value } )
    .then( credenciales => {
      this.cargando = false;
      this.router.navigate(['dashboard']);
      this.swAlert.crearToast('¡Login exitoso!', 'success');
    })
    .catch( error => {
      this.cargando = false;
      console.log(error);
      this.swAlert.dialogoSimple('error', '¡Ha ocurrido un error!', 'Correo o password incorrecto.');
    });
  }; 
}
