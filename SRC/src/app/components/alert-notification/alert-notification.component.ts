import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertNotificationType } from 'src/app/models/enums/AlertNotificationType.enum';

@Component({
  selector: 'app-alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.scss']
})
export class AlertNotificationComponent implements OnInit {
  /**
   * alert notification type
   */
  @Input() type: AlertNotificationType;

  /**
   * message text
   */
  @Input() text: string;

  /**
   * the time (ms) that this component will stay live
   */
  @Input() duration = 5000;

  /**
   * AlertNotificationType enum to compare with Input: type
   */
  AlertNotificationType = AlertNotificationType;

  /**
   * Event to emit that live time is over
   */
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClose = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  /**
   * emit that this componet is ready to close
   */
  close(): void {
    this.onClose.emit(true);
  }
}
