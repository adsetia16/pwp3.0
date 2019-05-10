import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class PreventAdminAccess implements CanActivate {

  constructor(
    private _Service: AuthService,
  ) { }
  isAdmin: boolean = false;

  canActivate() {
    this._Service._currentUser.subscribe((resp) => {
      this.isAdmin = resp.Roles == "Administrator";

      return this.isAdmin
    })
    return this.isAdmin
  }
} 
