import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertNotification } from './models/interfaces/AlertNotification.interface';
import { setAlertNotifcation } from './store/action/alert-notification.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * To show application messages
   */
  notification: AlertNotification;

  constructor(private store: Store<{ notification: AlertNotification }>) {
    // get AlertNotification state in the Store
    store.select('notification').subscribe((state) => {
      this.notification = state;
    });
  }

  ngOnInit(): void { }

  /**
   * Set AlertNotification state to hide AlertNotification component
   */
  onCloseAlertNotification(): void {
    // Dispatch action to set AlertNotification state to show: false
    this.store.dispatch(setAlertNotifcation({ ...this.notification, show: false }));
  }
}
