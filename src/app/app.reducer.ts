import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';

// Aquí programamos el Reducer global de nuestra aplicación.

export interface AppState {
    ui: ui.State,
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
}