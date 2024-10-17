import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, authState, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { UsuarioInterface } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {};

  // Este listener se encarga de avisarnos cuando ocurra un cambio con la autenticación.
  // Informa cuando se autentica a un usuario (login) y cuando se cierra cesión.
  public initAuthListener() {
    this.auth.onAuthStateChanged( usuario => {});
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
