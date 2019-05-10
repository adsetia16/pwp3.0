import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { User } from 'app/layout/user/models/user';
import { AuthService } from 'app/shared/services/auth.service';
import { UserService } from 'app/layout/user/services/user.service';
import { RoleService } from 'app/layout/role/services/role.service';
import { MenuService } from '../../../../menu/services/menu.service';
import { MenuItemModel } from '../../../../../shared/models/menu-item';
import { isNullOrUndefined } from '@swimlane/ngx-datatable/release/utils';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  providers: [UserService, RoleService, MenuService],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;
  userInfo: User = new User();
  folders: any[];
  filters: any[];
  labels: any[];
  accounts: object;
  selectedAccount: string;
  dialogRef: any;
  navMenus: MenuItemModel[] = [];
  roles: any //RoleUnit[] = []
  Currentrole: any //RoleUnit = new RoleUnit()

  // Private
  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private menuService: MenuService,
    private _router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.authService._currentUser.subscribe((resp) => {
      this.userInfo = resp
    })
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Directive
  @ViewChild(FusePerfectScrollbarDirective)
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this._fusePerfectScrollbar = theDirective;

    // Update the scrollbar on collapsable item toggle
    this._fuseNavigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });

    // Scroll to the active item position
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => {
          const activeNavItem: any = document.querySelector('navbar .nav-link.active');

          if (activeNavItem) {
            const activeItemOffsetTop = activeNavItem.offsetTop,
              activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
              scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

            this._fusePerfectScrollbar.scrollToTop(scrollDistance);
          }
        });
      }
      );
  }

  ngOnInit(): void {
    //this.userService.getUserInfo().subscribe(result => {
    //    this.userInfo = result;
    //    sessionStorage.setItem('CurrentUser', JSON.stringify(result))

    //    this.authService.setUser(result);
    //});
    //get menu by role
    this.authService._currentUser.subscribe((resp) => {
      this.menuService.getMenusByRole(resp.Roles).subscribe(result => {
        this.navMenus = result;
      });

      if (!isNullOrUndefined(resp.UserRoles)) {
        this.roles = resp.UserRoles.sort()
        this.Currentrole = resp.Roles
      }
    })
    this.roleService.getAll().subscribe(result => { this.authService.allRoles = result; });

    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this._fuseSidebarService.getSidebar('navbar')) {
          this._fuseSidebarService.getSidebar('navbar').close();
        }
      }
      );

    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    // Get current navigation
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });
  }

  change(item: any) {
    this.authService.changeUserInfo(item).subscribe(resp => {
      this.snackBar.open('Ganti role berhasil', 'Tutup', {
        duration: 2000,
        verticalPosition: 'top'
      })
      setTimeout(function () {
        document.getElementById('matForm').classList.remove('mat-focused')
      }, 100)
      this._router.navigateByUrl('/home')
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpened(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  toggleSidebarFolded(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleFold();
  }
}
