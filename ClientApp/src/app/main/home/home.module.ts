import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule, MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FuseSharedModule } from '@fuse/shared.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FlexLayoutModule,

    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,

    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,

    FuseSharedModule
  ],
  exports: [RouterModule],
  providers: [
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
