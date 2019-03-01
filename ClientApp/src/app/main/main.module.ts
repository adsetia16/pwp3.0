import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventAdminAccess } from '../shared/services/PreventAdminAccess';
import { SampleModule } from './sample/sample.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SampleModule
  ],
  providers: [PreventAdminAccess]
})
export class MainModule { }
