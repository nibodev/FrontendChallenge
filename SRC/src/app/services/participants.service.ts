import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pathToFileURL } from 'url';
import { AlertNotificationType } from '../models/enums/AlertNotificationType.enum';
import { AlertNotification } from '../models/interfaces/AlertNotification.interface';
import { Participant } from '../models/interfaces/Participant.interface';
import { setAlertNotifcation } from '../store/action/alert-notification.actions';

@Injectable({ providedIn: 'root' })
export class ParticipantsService {
  /**
   * Participants mock list
   */
  participants = [
    {
      id: 123,
      name: 'Humans',
    },
    {
      id: 321,
      name: 'Noxus',
    }
  ];

  /**
   * mock participant id
   */
  id = Math.floor(Math.random() * 1000);

  constructor(private store: Store<{ notification: AlertNotification }>) {
  }

  /**
   * return participants list filtered or not
   */
  list(params?: Participant): Participant[] {
    const result = !!params ? this.participants.filter(item =>
      item.id === params.id ||
      item.name === params.name
    ) :
      this.participants;

    return result;
  }

  /**
   * return a participant by id or name
   */
  get(params: Participant): Participant {
    const result = !!params && this.participants.find(item =>
      item.id === params.id ||
      item.name.toLowerCase() === params?.name?.toLowerCase()
    );
    return result;
  }

  /**
   * return participants list with new participant pushed
   */
  create(participantName: string): Participant[] {
    const param = { name: participantName, id: this.id++ };

    const hasParticipant = this.get(param);

    if (!hasParticipant) {
      const newArray = this.participants.slice();

      newArray.push(param);

      this.participants = newArray.slice();

    } else {
      this.dispatchNotification('Cannot create! Because, this name already exist');
    }

    return this.participants;
  }

  /**
   * return participants list with the participant selected removed
   */
  remove(participant: Participant, isDuplicate?: boolean): Participant[] {
    const hasParticipant = this.get(participant);

    if (!!hasParticipant) {
      const newArray = this.participants.slice();

      const index = newArray.findIndex(item => {
        return !isDuplicate ? item.name.toLowerCase() === participant.name.toLowerCase() :
          item.name === participant.name &&
          item.id === participant.id;
      });

      newArray.splice(
        index,
        1
      );

      this.participants = newArray.slice();
    }

    return this.participants;
  }

  /**
   * return participants list with the participant selected updated or removed if already exist
   * another participant with same name
   */
  update(participant: Participant): Participant[] {
    const hasParticipantDuplicated = this.list(participant).length > 1;

    if (!!hasParticipantDuplicated) {
      this.participants = this.remove(participant, true);

      this.dispatchNotification('Cannot update, because this name already exist');
    } else {
      this.participants = this.participants.map(item => {
        if (item.id === participant.id) {
          item = participant;
        }
        return item;
      });
    }

    return this.participants;
  }

  /**
   * call setAlertNotification action to change notification state
   */
  private dispatchNotification(text: string): void {
    this.store.dispatch(
      setAlertNotifcation({
        text,
        notificationType: AlertNotificationType['is-danger'],
        show: true
      })
    );
  }
}
