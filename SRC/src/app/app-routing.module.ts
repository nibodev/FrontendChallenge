import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattlefieldComponent } from './views/battlefield/battlefield.component';
import { LobbyComponent } from './views/lobby/lobby.component';

const routes: Routes = [
  // empty routes redirect to route lobby
  { path: '', redirectTo: 'lobby', pathMatch: 'full' },

  // Loby page route
  {
    path: 'lobby',
    component: LobbyComponent
  },

  // battlefield page route
  {
    path: 'battlefield',
    component: BattlefieldComponent
  },

  // any routes that is not battlefield or lobby, redirect to lobby route
  { path: '**', redirectTo: 'lobby', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
