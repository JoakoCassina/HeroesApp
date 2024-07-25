import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent, //Formato de pagina principal
    children: [//Paginas hijas que mantiene la estructura de la pág principal
      { path:'login', component: LoginPageComponent }, //logear usuario
      { path:'new-account', component: RegisterPageComponent }, // crear usuario
      { path: '**', redirectTo: 'login' } //En caso de agregar una ruta diferente redireccionar al Login
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
