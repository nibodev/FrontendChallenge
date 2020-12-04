import { createAction, props } from '@ngrx/store';
import { TournamentSwitching } from 'src/app/models/interfaces/TournamentSwitching.interface';

/**
 * Action that is call to change TournamentSwitching state value
 */
export const setTournamentSwitching = createAction('setTournamentSwitching', props<TournamentSwitching>());
