import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class PreventAdminAccess implements CanActivate {

  constructor() { }
  isAdmin: boolean = false;

  canActivate() {
    let cache: any;
    cache = JSON.parse(sessionStorage.getItem('CurrentUser'));
    var allRoles = cache.Roles.split(",");
    this.isAdmin = allRoles.filter(a => a == "Administrator") == "Administrator";

    return this.isAdmin
  }
} 
