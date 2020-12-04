import { createAction, props } from '@ngrx/store';
import { AlertNotification } from 'src/app/models/interfaces/AlertNotification.interface';

/**
 * Action that is call to change notification state value
 */
export const setAlertNotifcation = createAction('setAlertNotifcation', props<AlertNotification>());
