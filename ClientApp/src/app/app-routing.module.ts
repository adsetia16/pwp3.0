import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent } from './main/sample/sample.component';
import { HomeComponent } from './main/home/components/home/home.component';
// import { HomeComponent } from "./main/home/components/home/home.component";
// import { PageErrorComponent } from "./core/layout/components/page-error/page-error.component";
// import { Page404Component } from "./core/layout/components/page-404/page-404.component";
// import { Page401Component } from "./core/layout/components/page-401/page-401.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user',
    loadChildren: './layout/user/user.module#UserModule'
  },
  {
    path: 'menu',
    loadChildren: './layout/menu/menu.module#MenuModule'
  },
  {
    path: 'role',
    loadChildren: './layout/role/role.module#RoleModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  declarations: [
    // Page404Component,
    // PageErrorComponent,
    // Page401Component
  ]
})
export class AppRoutingModule {}
