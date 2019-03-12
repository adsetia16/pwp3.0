import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EAgendaComponent } from './e-agenda.component';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatToolbarModule
} from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';

const routes: Routes = [
  {
    //path: '',
    //component: EAgendaComponent,
    //children: []
  }
];

@NgModule({
  declarations: [EAgendaComponent],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    FuseSidebarModule,
    FuseSharedModule,
    CommonModule
  ]
})
export class EAgendaModule { }
