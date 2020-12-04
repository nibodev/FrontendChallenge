import { AlertNotificationType } from '../models/enums/AlertNotificationType.enum';
import { AlertNotification } from '../models/interfaces/AlertNotification.interface';
import { TournamentSwitching } from '../models/interfaces/TournamentSwitching.interface';

/**
 * Initial state from notification
 */
const notification: AlertNotification = {
  notificationType: AlertNotificationType['is-danger'],
  show: false,
  text: 'Algo de errado não está certo'
};

/**
 * Initial state from tournamentSwitching
 */
const tournamentSwitching: TournamentSwitching = {participants: [], roundType: ''};

/**
 * Initial states
 */
export const InitialStates = {
  notification,
  tournamentSwitching
};
