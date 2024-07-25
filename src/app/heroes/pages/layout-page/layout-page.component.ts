import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [

  ]
})
export class LayoutPageComponent {

  public sidebarItems = [//Lista de item que contiene nuestro navegador lateral (nombre, icono y ruta a la que te dirije)
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

}
