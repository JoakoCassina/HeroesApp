import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: []
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero; //Esperamos recibir un Object HERO del componente padre.

  ngOnInit(): void {
      if ( !this.hero ) throw Error('La propiedad Héroe es requerida')
  }
}
