import { Injectable } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  constructor() { }

  public tooltipInit(): void {
    // Inicializamos la configuración necesaria para los tooltips de bootstarpt.
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // Para iterar el tooltipTriggerList, debemos configurar en el tsconfig.json -> compilerOptions -> lib -> "dom.Iterable".
    const tooltipList = [...tooltipTriggerList].map( tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl) );
  };
};
