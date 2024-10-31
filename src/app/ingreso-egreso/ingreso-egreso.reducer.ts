import { createReducer, on } from '@ngrx/store';
import * as actions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
    items: IngresoEgreso[]; 
}

const initialState: State = {
    items: [],
}

export const ingresoEgresoReducer = createReducer(
    
    initialState,

    on( actions.setItems, ( state, { items } ) => ( { ...state, items: [ ...items ] } ) ),

    on( actions.unsetItems, ( state ) => ( { ...state , items: [] } ) ),
);
