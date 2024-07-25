import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: []
})
export class SearchPageComponent {

  public searchInput = new FormControl('');//Inicializamos un formulario reactivo con el valor incicial de un string vacio.
  public heroes: Hero[] = [];//Guardaremos una lista de héroes
  public selectedHero?: Hero;//Guardaremos un Héroe (opcional)

  constructor( private heroesServices: HeroesService ) {}

  searchHero(){//Buscar Héroes en funcion de un termino
    const value: string = this.searchInput.value || '';
    //Obtenemos el valor de entrada de nuestro buscador, en caso de ser null le asigna un el valor de un strign vacio.

    this.heroesServices.getSuggestions( value )
      .subscribe( heroes => this.heroes = heroes );
      //Llamamos al metodo del service y nos subscribimos para obtener la lista de héroes y asignarsela a nuestra heroes.
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {//Maneja la seleccion de un item por autocompletado
    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;//si nuestro buscador está vacio no muestra nada
    }
    const hero: Hero = event.option.value;//Si nuestro buscador tiene valor le asignamos el valor pasado a un Héroe
    this.searchInput.setValue( hero.superhero );//Establecemos el valor de entrada a el/los héroes relacionados con su nombre

    this.selectedHero = hero;//guardamos ese Héroe obtenido para su uso posterior.
  }

}
