import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SwalertService } from '../../services/swalert.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public constructor(
    private router: Router,
    private authService: AuthService,
    private swalert: SwalertService
  ) {};

  // Cierre de sesión del usuario con Firebase.
  public logout(): void {
    // this.swalert.crearLoading('¡Cerrando sesión!');
    this.authService.cerrarSesion()
    .then( () => {
      // this.swalert.cerrarAlert();
      this.router.navigate(['/login']);
    })
    .catch( ()=> {
      // this.swalert.cerrarAlert();
      this.swalert.dialogoSimple('error', 'Ha ocurrido un error', 'No se ha podido cerrar la sesión. Consulte con el administrador.');
    });
  };
}
