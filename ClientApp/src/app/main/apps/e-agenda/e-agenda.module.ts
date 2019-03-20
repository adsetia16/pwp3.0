import { NgModule } from '@angular/core';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EAgendaComponent } from './e-agenda.component';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatToolbarModule, MatDatepickerModule, MatSlideToggleModule, MatTooltipModule
} from '@angular/material';
import { FuseSidebarModule, FuseConfirmDialogModule } from '@fuse/components';
import { JadwalkuComponent } from './jadwalku/jadwalku.component';
import { JadwalatasanComponent } from './jadwalatasan/jadwalatasan.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { EAgendaService } from './e-agenda.service';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';


@NgModule({
  declarations: [EAgendaComponent, JadwalkuComponent, JadwalatasanComponent, CalendarEventFormDialogComponent],
  exports: [EAgendaComponent],
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,

    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,

    FuseSharedModule,
    FuseConfirmDialogModule
  ],
  providers: [
    EAgendaService
  ],
  entryComponents: [
    CalendarEventFormDialogComponent
  ]
})
export class EAgendaModule { }
