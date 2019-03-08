import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HomeRoutingModule } from './home-routing.module';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    HomeRoutingModule,
    MatIconModule
  ],
  providers: [
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
