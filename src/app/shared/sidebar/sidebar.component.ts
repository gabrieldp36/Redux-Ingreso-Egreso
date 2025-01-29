import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SwalertService } from '../../services/swalert.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() nombreUsuario: string|undefined = undefined;

  public constructor(
    private router: Router,
    private authService: AuthService,
    private swalert: SwalertService
  ) {};

  // Cierre de sesión del usuario con Firebase.
  public logout(): void {
    this.swalert.crearDialogoConfirmacion('Cerrar sesión', '¿Confirmás la acción?', 'center', 'question')
    .then((result: any) => {
      if (result.isConfirmed) {
        this.authService.cerrarSesion()
        this.router.navigate(['/login']);
      };
    });
  };
}
