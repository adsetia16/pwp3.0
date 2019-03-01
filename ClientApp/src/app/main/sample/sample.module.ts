import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { MatIconModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatRippleModule, MatOptionModule, MatSelectModule, MatCheckboxModule, MatDividerModule, MatListModule } from '@angular/material';

const routes = [
    {
        path     : '',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatChipsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        MatRippleModule
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
