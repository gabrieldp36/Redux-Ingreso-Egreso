import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

// Seteamos al usuario autenticado.
export const setUser = createAction(
    '[Auth] setUser',
    props<{user: Usuario}>()
);

// Eliminamos al usuario autenticado (Ej.: ante el cierre de sesión).
export const unsetUser = createAction('[Auth] unsetUser');
