import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { EAgendaComponent } from './e-agenda/e-agenda.component';

const routes = [
  {
    path: 'e-agenda',
    component: EAgendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FuseSharedModule],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
