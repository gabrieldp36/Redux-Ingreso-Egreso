import { createAction } from '@ngrx/store';

// Acciones.
export const isLoading = createAction('[UI Component] IsLoading');
export const stopLoading = createAction('[UI Component] StopLoading');
