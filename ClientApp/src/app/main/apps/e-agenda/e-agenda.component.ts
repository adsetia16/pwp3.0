import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'app-e-agenda',
  templateUrl: './e-agenda.component.html',
  styleUrls: ['./e-agenda.component.scss']
})
export class EAgendaComponent implements OnInit {

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
