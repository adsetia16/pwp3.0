import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventAdminAccess } from '../shared/services/PreventAdminAccess';
import { SampleModule } from './sample/sample.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SampleModule,
    HomeModule
  ],
  providers: [PreventAdminAccess]
})
export class MainModule { }
