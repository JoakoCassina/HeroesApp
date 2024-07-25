import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Hero } from "../interfaces/hero.interface";
import { environments } from "../../../environments/environments";

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;//Creamos un atributo que guarda la URL a la que vamos a consultar nuestra DB

  constructor(private http: HttpClient) { }//Para realizar solicitudes HTTP

  getHeroes():Observable<Hero[]> {//Endpoints al que recurrimos para devolver la lista de todos los héroes
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroById( id: string ): Observable<Hero | undefined> {//Endpoints para devolver un Héroe por ID (puede existir como no)
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        catchError(error => of(undefined))//Si el héroe no existe devuelve undefined (en lugar de tirar error)
      )
  }

  getSuggestions( query: string ): Observable<Hero[]> {//Endpoints que devuelve un Array de héroes por query(cadena de texto)
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`)
  }//Le pasamos el valor de busqueda y un limit=6 para limitar los resultados de búsqueda.

  //CRUD(Endpoints)
  addHero( hero: Hero ): Observable<Hero> {//para crear un héroe le pasamos una solicitud POST
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }//Primero le pasamos la ruta especificada y segundo pasamos un objeto de tipo Héroe.Esto devuelve un observable del héroe creado para su uso posterior

  updateHero( hero: Hero ): Observable<Hero> {//Para Actualizar un héroe (solicitud PATCH)
    if ( !hero.id ) throw Error('El ID del héroe es requerido')
    //si no se pasa un ID, la actualización del mismo no se puede realizar, y corta con el msj de error
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
  }//Por solicitud PATCH ya que la actualizacion se realiza por campos específicos
  //Le pasamos la ruta especificada con el ID valido, y los campos de héroe a actualizar.

  deleteHeroById( id: string): Observable<boolean> {//Para eliminar un héroe por ID (retorna TRUE:si se elimino, caso contrario FALSE)

    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map( resp => true),
        catchError( err => of(false) ),
      );
  }//Por solicitud DELETE. mapeamos la respuesta a TRUE (el héroe fue eliminado) caso contrario la eliminación falló
}
