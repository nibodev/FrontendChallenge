import { NgModule } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { AlertNotifcationReducer } from './reducer/alert-notification.reducer';
import { TournamentSwitchingReducer } from './reducer/tournament-switching.reducer';

@NgModule({
  declarations: [
  ],
  imports: [
    StoreModule.forRoot({
      notification: AlertNotifcationReducer,
      tournamentSwitching: TournamentSwitchingReducer
    })
  ],
  providers: [Store]
})
export class AppStoreModule { }
