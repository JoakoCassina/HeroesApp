import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styles: []
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;//Inicializamos un héroe (opcional pq puede lelgar como no)

  constructor(
    private heroesService: HeroesService, //para obtener los métodos del service
    private activatedRoute: ActivatedRoute,//Para obtener información sobre la ruta Activada (/heroes/:ID)
    private router: Router,//Para poder navegar entre diferentes vistas
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params //accede a los paramateros de la ruta
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),//para cambiar al observable que nos devuelve getHeroById
      )
      .subscribe( hero => {//nos subscribimos al observable resultante
        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);//si no se encuentra el ID volvemos al listado de héroes

        this.hero = hero;//al obtener el héroe se lo asignamos a la propiedad declarada anteriormente
        return;
      })
  }

  goBack(): void { //Metodo que te regresa al listado de héroes
    this.router.navigateByUrl('heroes/list');
  }

}
