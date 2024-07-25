import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {

  transform( hero: Hero ): string { //Recibimos un Héroe y devolvemos un String
    if ( !hero.id && !hero.alt_img ) { //Si nuestro héroe no tiene imagen devuelve una por defecto
      return '/assets/no-image.png';
    }

    if ( hero.alt_img ) return hero.alt_img; //Si el héroe tiene una imagen devuelve la misma

    return `/assets/heroes/${ hero.id }.jpg`; //ruta donde se encuentra cada imagen (con id correspondiente a cada héroe)
  }

}
