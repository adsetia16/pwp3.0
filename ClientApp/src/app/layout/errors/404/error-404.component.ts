import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'error-404',
    templateUrl  : './error-404.component.html',
  styleUrls: ['./error-404.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
   
})
export class Error404Component
{
    /**
     * Constructor
     */
    constructor()
    {

    }
}
