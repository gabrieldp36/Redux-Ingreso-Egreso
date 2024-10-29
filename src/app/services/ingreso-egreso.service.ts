import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  public constructor(
    private firestore: Firestore,
    private authService: AuthService,
  ) {};

  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const uid = this.authService.getUsuarioAuth?.uid;
    
    //Como sabemos que items es una colección que queremos tener en el documento ingreso-egreso, asignamos el path directamante.
    const collectionIngresoEgreso = collection(this.firestore, `${uid}/ingreso-egreso/items`);
    
    //se crean los documentos dentro de la coleccion items pero no se asignan por un nombre sino por un id genérico de firebase.
    const documentRef = doc(collectionIngresoEgreso);

    //se setea el documento a la coleccion definida por id generico.
    /*
      Nota Importante:

      Como comentamos el uid del modelo no es necesario pasarlo explicitamente, es decir, si fuera parte del modelo, debemos enviar { ...ingresoEgreso, uid }, es decir
      setDoc(documentRef, { ...ingresoEgreso, uid })
    */

    return setDoc( documentRef, { ...ingresoEgreso } );
  };
}
