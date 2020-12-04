import { AlertNotificationType } from '../enums/AlertNotificationType.enum';

export interface AlertNotification {
  notificationType: AlertNotificationType;
  text: string;
  show: boolean;
}
