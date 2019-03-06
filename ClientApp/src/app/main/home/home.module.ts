import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    HomeRoutingModule,
  ],
  providers: [
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
