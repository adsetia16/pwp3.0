import { Injectable } from "@angular/core";
import { User } from "app/layout/user/models/user";
import { Role } from "app/layout/user/models/role";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class AuthService {
  loggedUser: User;
  allRoles: Role[];
  _currentUser: BehaviorSubject<User> = new BehaviorSubject(new User())

  constructor(private http: HttpClient) {

  }

  getUser(): Observable<User> {
    return new Observable((observer) => {
      this.http.get<User>(`Index/UserInfo`).subscribe((resp) => {
        observer.next(resp)
        this._currentUser.next(resp)
        observer.complete()
      },
        () => {
          window.location.href = "/"
        })
    })
  }

  changeUserInfo(item: any): Observable<any> {
    return new Observable((observer) => {
      const url = `Index/ChangeUserInfo`
      this.http.post(url, { "setRole": item }).subscribe((resp: User) => {
        observer.next(resp)
        this._currentUser.next(resp)
        observer.complete()
      })
    })

  }

  setUser(user: User): void {
    this.loggedUser = user;
    this.loggedUser.UserRoles = user.Roles.split(",");

  }

  getLoggedUser(): User {
    return this.loggedUser;
  }

  userInRole(role: string): boolean {
    if (this.loggedUser.UserRoles.indexOf(role) > -1) {
      return true;
    } else {
      return false;
    }
  }

  userInAnyRole(roles: string[]): boolean {
    var result = false;
    roles.forEach(role => {
      if (this.loggedUser.UserRoles.indexOf(role) > -1) {
        result = result || true;
      }
    });
    return result;
  }
}
