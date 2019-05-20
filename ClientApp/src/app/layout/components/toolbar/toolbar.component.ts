import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { AuthService } from 'app/shared/services/auth.service';
import { UserService } from 'app/layout/user/services/user.service';
import { User } from 'app/layout/user/models/user';
import { RoleService } from '../../role/services/role.service';
import { MenuService } from '../../menu/services/menu.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MenuItemModel } from '../../../shared/models/menu-item';
import { isNullOrUndefined } from '@swimlane/ngx-datatable/release/utils';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [UserService, RoleService, MenuService],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  userInfo: User = new User();
  navMenus: MenuItemModel[] = [];
  roles: any //RoleUnit[] = []
  Currentrole: any //RoleUnit = new RoleUnit()

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {TranslateService} _translateService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
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
    // Set the defaults
    this.userStatusOptions = [
      {
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      },
      {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'tr',
        title: 'Turkish',
        flag: 'tr'
      }
    ];

    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    //this.userService.getUserInfo().subscribe(result => {
    //  this.userInfo = result;
    //  sessionStorage.setItem('CurrentUser', JSON.stringify(result))

    //  this.authService.setUser(result);
    //});
    //this.userInfo = JSON.parse(sessionStorage.getItem('CurrentUser'));

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
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
  }



  change(item: any) {
    this.authService.changeUserInfo(item).subscribe(resp => {
      this.snackBar.open('Ganti role berhasil', 'Tutup', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
      setTimeout(function () {
        document.getElementById('matForm').classList.remove('mat-focused')
      }, 100)
      this._router.navigateByUrl('/home')
    })
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  /**
   * Search
   *
   * @param value
   */
  search(value): void {
    // Do your search here...
    console.log(value);
  }

  /**
   * Set the language
   *
   * @param lang
   */
  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this._translateService.use(lang.id);
  }
}
