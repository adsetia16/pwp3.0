import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations

})
export class LayoutMainComponent implements OnInit {

  constructor(
    private _fuseSidebarService: FuseSidebarService
  ) { }

  ngOnInit() {
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
