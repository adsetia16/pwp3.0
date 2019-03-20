import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppsRoutingModule } from './apps-routing.module';
import { EAgendaModule } from './e-agenda/e-agenda.module';

@NgModule({
  imports: [
    AppsRoutingModule,
    FuseSharedModule,
    EAgendaModule
  ],
})
export class AppsModule { }
