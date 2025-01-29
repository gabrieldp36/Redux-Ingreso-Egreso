import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform( items: IngresoEgreso[] ): IngresoEgreso[]  {
    return items.slice().sort(this.compareIngresosEgresos);
  };

  private compareIngresosEgresos(a:IngresoEgreso, b:IngresoEgreso): number {
    if (a.tipo > b.tipo) return  -1;
    if (a.tipo < b.tipo) return  1;
    else {
      // Ante igualdad de tipo ordenamos por monto, en forma descendente.
      if (a.monto > b.monto) return -1;
      else if (a.monto < b.monto) return 1;
      return 0;
    };
  };
}
