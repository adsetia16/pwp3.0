import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { EAgendaComponent } from './e-agenda/e-agenda.component';
import { JadwalkuComponent } from './e-agenda/jadwalku/jadwalku.component';
import { JadwalatasanComponent } from './e-agenda/jadwalatasan/jadwalatasan.component';

const childRoutes: Routes = [
  {
    path: 'e-agenda',
    children: [
      { path: "", component: EAgendaComponent },
      { path: "jadwalatasan", component: JadwalatasanComponent }
    ],
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(childRoutes),
    FuseSharedModule,
  ],
  exports: [RouterModule],
})
export class AppsRoutingModule { }
