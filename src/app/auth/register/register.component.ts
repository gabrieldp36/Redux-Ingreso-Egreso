import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SwalertService } from '../../services/swalert.service';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  // Banderas booleanas.
  public cargando: boolean = false;
  public focusUsuario: boolean = false;
  public focusEmail: boolean = false;
  public focusPassword: boolean = false;

  // Formularios.
  public registroForm: FormGroup;
  public passwordPatron: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private swAlert: SwalertService,
    private tooltipService: TooltipService,
  ) {
    this.registroForm = this.fb.group({
      nombre: [ '', Validators.required ],
      correo: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [Validators.required, Validators.pattern(this.passwordPatron)] ]
    });
  };

  public ngOnInit(): void {
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
      } else if( this.registroForm.get(control)?.getError('email') ) {
        return 'Ingrese un correo válido';
      } else if( this.registroForm.get(control)?.getError('pattern') ) {
        return 'La contraseña debe contener mínimo 8 caractéres, al menos una letra mayúscula, una letra minúscula y un número.';
      };
    };
    return '';
  };

  public crearUsuario(): void {
    // Creación del usuario en Firebase.
    this.cargando = true;
    this.authService.crearUsuario( { ...this.registroForm.value } )
    .then( usuario => {
      this.cargando = false;
      this.router.navigate(['dashboard']);
      this.swAlert.crearToast('¡Usuario creado!', 'success');
    })
    .catch( error => {
      this.cargando = false;
      console.log(error) 
      this.swAlert.dialogoSimple('error', '¡Ha ocurrido un error!', 'No se ha podido crear al usuario.');
    });
  };
}
