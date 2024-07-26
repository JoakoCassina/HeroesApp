import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/pages/services/auth.service';
import { User } from '../../../auth/pages/interfaces/user.interface';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [ ``]
})
export class LayoutPageComponent {

  public sidebarItems = [//Lista de item que contiene nuestro navegador lateral (nombre, icono y ruta a la que te dirije)
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

  constructor(
    private authService: AuthService,
    private router: Router) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
