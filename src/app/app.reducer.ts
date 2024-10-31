import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';


// Aquí programamos el Reducer global de nuestra aplicación.

export interface AppState {
    ui: ui.State,
    auth: auth.State
    ingresoEgreso: ingresoEgreso.State
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer,
   ingresoEgreso: ingresoEgreso.ingresoEgresoReducer,
}