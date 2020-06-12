import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { RegionComponent } from './components/region/region.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { TournamentService } from './services/tournament.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ListComponent,
    RegionComponent,
    TournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
