import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventAdminAccess } from '../shared/services/PreventAdminAccess';
import { SampleModule } from './sample/sample.module';
import { HomeModule } from './home/home.module';
import { AppsModule } from './apps/apps.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SampleModule,
    HomeModule,
    AppsModule
  ],
  providers: [PreventAdminAccess]
})
export class MainModule { }
