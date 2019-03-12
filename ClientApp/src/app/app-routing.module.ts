import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent } from './main/sample/sample.component';
import { HomeComponent } from './main/home/components/home/home.component';
import { Error404Component } from './layout/errors/404/error-404.component';
import { Error500Component } from './layout/errors/500/error-500.component';
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
    path: 'home',
    loadChildren: './main/home/home.module#HomeModule'
  },
  {
    path: 'apps',
    loadChildren: './main/apps/apps.module#AppsModule'
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
  },
  {
    path: 'generator-crud',
    loadChildren: './layout/generator-crud/generator-crud.module#GeneratorCrudModule'
  },
  {
    path: 'error',
    children: [
      { path: '', component: Error404Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component }
    ]
  },
  { path: '**', redirectTo: 'error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  declarations: [
    Error404Component,
    Error500Component
    // Page404Component,
    // PageErrorComponent,
    // Page401Component
  ]
})
export class AppRoutingModule {}
