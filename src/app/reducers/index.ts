import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';

export interface AppState {}

function setSavedState(state: any, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}
function getSavedState(key: string): any {
  return JSON.parse(localStorage.getItem(key));
}
const stateKeys = ['auth'];
// the key for the local storage.
const localStorageKey = '__app_storage__';

export function storageMetaReducer<S, A extends Action = Action> (reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…
  return function(state: S, action: A): S {
    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit           = false;
      const savedState = getSavedState(localStorageKey);

      return {
        ...nextState,
        ...savedState
      };
    }
    // save the next state to the application storage.
    const stateToSave = {};

    stateKeys.forEach(key => {
      stateToSave[key] = nextState[key];
    });

    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};


export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger, storageMetaReducer] : [];
