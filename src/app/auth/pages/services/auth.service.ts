import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { catchError, map, Observable, of, tap } from "rxjs";

import { environments } from "../../../../environments/environments";
import { User } from "../interfaces/user.interface";

@Injectable({ providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;//Ruta principal para obtener los usuarios
  private user?: User;

  constructor( private http: HttpClient) {}

  get currentUser(): User| undefined {
    if (!this.user) return undefined; //Si el usuario no existe devuelve undefined
    return structuredClone( this.user );//si el usuario existe, structuredClone(crea una copia profunda del usuario)
  }

  login( email: string, password: string ): Observable<User> {//Recibimos un meil y pass, devolvemos un Usuario (si lo encuentra)

    return this.http.get<User>(`${ this.baseUrl }/users/1`)//Petición GET que devuelve un usuario por ID
      .pipe(
        tap( user => this.user = user ),//Si obtenemos el usuario se lo asignamos al user declarado anteriormente.
        tap( user => localStorage.setItem('token', 'aa11dd22' )),//lo almacenamos en el localStorage con esos datos.
      );
  }

  checkAuth(): Observable<boolean> {
    if ( !localStorage.getItem('token')) return of(false);//Si no existe un token en el localStorage retorna FALSE

    const token = localStorage.getItem('token');//Si el token existe lo almacenamos.

    return this.http.get<User>(`${ this.baseUrl }/users/1`)//realizamos una solicitud GET para sacar sus datos.
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),//El objeto !!user: Convierte el objeto user en TRUE(si existe), y en FALSE (si es null o undefined)
        catchError( err => of(false))
      )
  }

  logout() {
    this.user = undefined;//Deslogea el usuario actual
    localStorage.clear();//Elimina los datos del LocalStorage
  }
}
