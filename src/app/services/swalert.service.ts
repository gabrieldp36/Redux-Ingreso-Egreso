import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class SwalertService {

  constructor() { };

  public dialogoSimple(icon: SweetAlertIcon, title: string, text: string): void {
    Swal.fire( {
      icon,
      title,
      text,
      confirmButtonColor: '#7b1fa2',
      returnFocus: false,
    });
  };

  public crearDialogoConfirmacion (
    title: string, 
    text: string, 
    position: SweetAlertPosition = 'center', 
    icon: SweetAlertIcon = 'warning', 
    color?: string, 
    txtBtnConfirm?: string,
    txtBtnCancel?: string,
    ): Promise<any> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass   : {
        confirmButton   : 'btn btn-success',
        cancelButton    : 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    return swalWithBootstrapButtons
    .fire({
      position          : position,
      title             : title,
      text              : text,
      icon              : icon,
      color             : color,
      showCancelButton  : true,
      confirmButtonText : (txtBtnConfirm) ? txtBtnConfirm : 'Continuar',
      cancelButtonText  : (txtBtnCancel) ? txtBtnCancel : 'Cancelar',
      reverseButtons    : true,
    });
  };

  public crearToast (title: string, icon: SweetAlertIcon) {

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    
    Toast.fire({
      icon: icon,
      title: title
    });
  };

  public crearLoading (texto: string): void {
    Swal.fire({
      title: texto,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  };

  public cerrarAlert(): void {
    Swal.close();
  };
}
