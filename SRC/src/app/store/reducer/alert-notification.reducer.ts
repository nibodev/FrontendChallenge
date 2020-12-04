import { Action, createReducer, on } from '@ngrx/store';
import { AlertNotification } from 'src/app/models/interfaces/AlertNotification.interface';
import { setAlertNotifcation } from '../action/alert-notification.actions';
import { InitialStates } from '../app-states';

const initialState = InitialStates.notification;

/**
 * Change state value
 */
const reducer = createReducer(
  initialState,
  on(
    setAlertNotifcation,
    (state, newValue) => ({ ...state, ...newValue }),
  )
);

/**
 * Return notification state value changed
 */
export function AlertNotifcationReducer(state: AlertNotification, action: Action): AlertNotification {
  return reducer(state, action);
}
