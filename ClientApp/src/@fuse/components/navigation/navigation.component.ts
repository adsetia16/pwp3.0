import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { MenuService } from 'app/layout/menu/services/menu.service';
import { MenuItemModel } from 'app/shared/models/menu-item';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'fuse-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [MenuService],
  encapsulation: ViewEncapsulation.None
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit {
  @Input()
  layout = 'vertical';

  @Input()
  navigation: any;

  // Private
  //private _unsubscribeAll: Subject<any>;
  navMenus: MenuItemModel[] = [];

  constructor(
    //private _changeDetectorRef: ChangeDetectorRef,
    //private _fuseNavigationService: FuseNavigationService,
    private menuService: MenuService,
    private _Service: AuthService,
  ) {
    // Set the private defaults
    //this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._Service._currentUser.subscribe((resp) => {
      this.menuService.getMenusByRole(resp.Roles).subscribe(result => {
        this.navMenus = result;
      });
    })

    // Load the navigation either from the input or from the service
    //this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

    // Subscribe to the current navigation changes
    // this._fuseNavigationService.onNavigationChanged
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(() => {

    //         // Load the navigation
    //         this.navigation = this._fuseNavigationService.getCurrentNavigation();

    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     });

    // // Subscribe to navigation item
    // merge(
    //     this._fuseNavigationService.onNavigationItemAdded,
    //     this._fuseNavigationService.onNavigationItemUpdated,
    //     this._fuseNavigationService.onNavigationItemRemoved
    // ).pipe(takeUntil(this._unsubscribeAll))
    //  .subscribe(() => {

    //      // Mark for check
    //      this._changeDetectorRef.markForCheck();
    //  });
  }
}
