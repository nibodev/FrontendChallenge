import { Action, createReducer, on } from '@ngrx/store';
import { TournamentSwitching } from 'src/app/models/interfaces/TournamentSwitching.interface';
import { setTournamentSwitching } from '../action/tournament-switching.action';
import { InitialStates } from '../app-states';

const initialState = InitialStates.tournamentSwitching;

/**
 * Change state value
 */
const reducer = createReducer(
  initialState,
  on(
    setTournamentSwitching,
    (state, newValue) => ({ ...state, ...newValue }),
  )
);

/**
 * Return TournamentSwitching state value changed
 */
export function TournamentSwitchingReducer(state: TournamentSwitching, action: Action): TournamentSwitching {
  return reducer(state, action);
}
