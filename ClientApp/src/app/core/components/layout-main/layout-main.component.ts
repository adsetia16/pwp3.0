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
  ) { }

  ngOnInit() {
  }
}

@Component({
  selector: 'button-sidebar',
  template: `
            <button mat-icon-button class="sidebar-toggle" fxHide.gt-md
            (click)="toggleSidebar('app-sidebars')">
            <mat-icon>menu</mat-icon>
          </button>`
})
export class ButtonSideBarComponent {
  // gsearch: string = "";
  // @Output() search: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private _fuseSidebarService: FuseSidebarService
  ) { }
  
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
