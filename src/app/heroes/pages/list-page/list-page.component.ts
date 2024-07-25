import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: []
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];//vamos a obtener una lista de héroes

  constructor( private heroesService: HeroesService ) {}//De donde vamos a obtener nuestra lista de héroes

  ngOnInit(): void {
    this.heroesService.getHeroes()//llamamos al método que nos trae los héroes
      .subscribe(heroes => this.heroes = heroes);
      //nos subscribimos al observable para obtener el listado de heroes y asignarlos a nuestro array de Héroes
  }

}
