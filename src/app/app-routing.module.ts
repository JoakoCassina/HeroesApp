import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [//Definimos nuestras rutas principales
  {
    path: 'auth',//Maneja todo lo de usuarios
    loadChildren:() =>import ('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'heroes',//Mnaeja todo lo de héroes
    loadChildren:() =>import ('./heroes/heroes.module').then(m => m.HeroesModule),
  },
  {
    path: '404',//Mnaeja las pág que no existen(Devovliendo un error)
    component: Error404PageComponent
  },
  {
    path: '',//Si la ruta esta vacia redirecciona a Heroes
    redirectTo: 'heroes',
    pathMatch: 'full',//Debe ser de coincidencia exacta
  },
  {
    path: '**',//Si la ruta no está definida redirecciona a 404
    redirectTo: '404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
