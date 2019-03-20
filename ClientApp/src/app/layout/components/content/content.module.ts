import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { ContentComponent } from 'app/layout/components/content/content.component';
import { CoreModule } from '../../../core/core.module';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
        CoreModule
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
