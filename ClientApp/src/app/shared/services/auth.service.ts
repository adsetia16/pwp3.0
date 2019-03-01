import { Injectable } from "@angular/core";
import { User } from "app/layout/user/models/user";
import { Role } from "app/layout/user/models/role";

@Injectable()
export class AuthService {
    loggedUser: User;
    allRoles: Role[];

  setUser(user: User): void{
        this.loggedUser = user;
        this.loggedUser.UserRoles = user.Roles.split(",");
    }

    getLoggedUser(): User{
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
