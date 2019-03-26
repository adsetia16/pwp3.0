import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

import { Error404Component } from 'app/layout/errors/404/error-404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
    {
        path     : 'errors/error-404',
        component: Error404Component
    }
];

@NgModule({
    declarations: [
        Error404Component
    ],
    imports     : [
        RouterModule.forChild(routes),

      MatIconModule,
      BrowserAnimationsModule,
       FuseSharedModule
    ]
})
export class Error404Module
{
}
