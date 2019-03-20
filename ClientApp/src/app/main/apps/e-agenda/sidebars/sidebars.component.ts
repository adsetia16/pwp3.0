import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { MenuService } from 'app/layout/menu/services/menu.service';
import { MenuItemModel } from 'app/shared/models/menu-item';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss'],
  providers: [MenuService],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SidebarsComponent implements OnInit {

  folders: any[];
  filters: any[];
  labels: any[];
  accounts: object;
  selectedAccount: string;
  dialogRef: any;
  navMenus: MenuItemModel[] = [];

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe(result => {
      this.navMenus = result;
    });
  }

}
