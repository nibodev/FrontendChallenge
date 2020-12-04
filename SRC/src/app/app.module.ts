import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertNotificationComponent } from './components/alert-notification/alert-notification.component';
import { AppStoreModule } from './store/app-store.module';
import { BattlefieldComponent } from './views/battlefield/battlefield.component';
import { LobbyComponent } from './views/lobby/lobby.component';


@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    BattlefieldComponent,
    AlertNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
