import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import * as actions from '../actions/auth.actions';

export interface State {
    usuario: Usuario|null; 
};

export const initialState: State = {
    usuario: null,
};

export const authReducer = createReducer(

    initialState,

    on( actions.setUser, ( state, {  user } ) =>  ( { ...state,  usuario: { ... user } } ) ),

    on( actions.unsetUser, state => ( { ...state, usuario: null} ) ),

);
