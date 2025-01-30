import { Injectable } from '@angular/core';
import { Firestore, QueryDocumentSnapshot, collection, collectionSnapshots, deleteDoc, doc, setDoc} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
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

  public initIngresoEgresoListener(uid: string): Observable<IngresoEgreso[]> {

    return collectionSnapshots (
      collection(this.firestore, `${uid}/ingreso-egreso/items`)
    )
    .pipe(
      map( ( items: QueryDocumentSnapshot[] ) => 
          items.map( item => IngresoEgreso.fromFirebase( { ...item.data(), uid: `${item.id}` } )
        ),
      ),
    )
  };

  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<void> {

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

  public borrarIngresoEgreso(uidItem:string): Promise<void> {
    const uidUsuario = this.authService.getUsuarioAuth?.uid;
    return deleteDoc(
      doc( this.firestore, `${uidUsuario}/ingreso-egreso/items/${uidItem}` ),
    );
  };

}
