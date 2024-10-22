import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, authState, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc, where, query, getDocs} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';
import { UsuarioInterface } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {};

  public initAuthListener() {

    // Este listener se encarga de avisarnos cuando ocurra un cambio con la autenticación.
    // Informa cuando se autentica a un usuario (login) y cuando se cierra cesión.
    this.auth.onAuthStateChanged(  async ( usuario: User|null ) => {
      
      // Si el usuario existe, implementamos una query para recuperar la data y así poder agregarla a nuestro auth state.
      if( usuario ) {

        const userRef = collection( this.firestore, 'usuario' );
        const queryResult = query( userRef, where( 'uid', '==', usuario.uid) );
        const querySnapshot = await getDocs(queryResult) ;
        const data = querySnapshot.docs[0].data();
        this.store.dispatch( authActions.setUser( { user: Usuario.fromFirebase(data) } ) );

      } else {

        this.store.dispatch( authActions.unsetUser() );
      };
    });
  };

  public async crearUsuario( { nombre, correo, password }: UsuarioInterface): Promise<User> {
    
    const { user } = await createUserWithEmailAndPassword(this.auth, correo, password);
    // Primero creamos al objeto usuario con los datos que obtenemos del formulario de registro.
    const nuevoUsario = new Usuario( user.uid, nombre, correo);
    // Obtenemos la referencia de la collección dónde queremos guardar el documento.
    const colleccionRef = collection( this.firestore, 'usuario');
    // Guardamos el documento en la colección. Es importante aclara que Firebase no acepta instancias de clase
    // Solo objetos literales, por ello usamos el operador spread {...nuevoUsuario}.
    addDoc( colleccionRef, { ...nuevoUsario } );
    // Retornamos la información del usuario creado.
    return user;
  };

  public loguearUsuario(usuario: UsuarioInterface): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, usuario.correo, usuario.password);
  };

  public cerrarSesion(): Promise<void> {
    return this.auth.signOut();
  };

  public isAuth(): Observable<boolean> {
    return authState(this.auth).pipe( map ( usuario => usuario != null ) );
  };
}
