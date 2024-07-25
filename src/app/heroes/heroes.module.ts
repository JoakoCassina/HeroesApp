import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [//Declaramos los componentes que utilizamos y nuestro Pipe Personalizado que maneja las IMG
    CardComponent,
    ConfirmDialogComponent,
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    //pipes
    HeroImagePipe,

  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,//Modulo que maneja las rutas de los componentes
    MaterialModule,//Modulo que maneja la estructuras y etiquetas de nuestro HTML provenientes de (Angular Material)
    ReactiveFormsModule,//Modulo que maneja nuestros formularios reactivos
  ]
})
export class HeroesModule { }
