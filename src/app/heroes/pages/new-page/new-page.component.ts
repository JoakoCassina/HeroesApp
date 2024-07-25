import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({//inicializamos un formulario reactivo (cada control representa cada atributo de un héroe)
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  })

  public publishers = [//Lista de seleccion del creador (para elegir entre uno u el otro para el héroe)
    { id: 'DC Comic', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {//Se encarga de inicializar el componente cuando se carga por primera vez
    if ( !this.router.url.includes('edit')) return;//Verifica si la URL incluye /edit (si no lo contiene se detiene)

    this.activatedRoute.params//Observable que emite los parámetros de la ruta actual (ID)
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),
        //Recibe el ID de la ruta y llama al método del service. que con el ID devuelve un observable que emite al héroe correspondiente
      ).subscribe( hero => {//Nos subscribimos al nuevo observable (el resultado del método del servis llamado anteriormente)

        if ( !hero) return this.router.navigateByUrl('/');//Si no se eonctro ningun héroe con el ID pasado redirigimos a la ruta principal

        this.heroForm.reset( hero );//Si se encontro el héroe con el (.reset) completamos el formulario con los datos del héroe existente.
        return;
      });
  }

  onSubmit(): void {//Crear o Editar un héroe
    if ( this.heroForm.invalid ) return;//Verifica si el formulario es inválido

    if ( this.currentHero.id ) {//Comprueba si el héroe tiene ID(si lo tiene está en modo edicion)
      this.heroesService.updateHero( this.currentHero )//Llamamos al método para actualizar los datos del héroe
        .subscribe( hero => {//Nos subscribimos al observable emitido por updateHero
          this.showSnackBar(`${ hero.superhero } updated!`) //Mandamos un msj de actualizado con Éxito
        });
        return;
    }
    this.heroesService.addHero( this.currentHero )
    //Si el héroe no tiene ID (está en modo Agregar héroe) y llama al método que crea un nuevo héroe
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id ]);//Navega al pág de edicion del nuevo héroe creado
        this.showSnackBar(`${ hero.superhero } created!`)//Devolvemos un msj de creado con Éxito
      });
  }

  onDeleteHero() {//Para eliminar un Héroe
    if( !this.currentHero.id) throw Error('El ID del héroe es requerido');//El ID es obligatorio

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {//Abrimos un dialogo de confirmación utilizando MatDialog
      data: this.heroForm.value//Pasamos los datos del formulario al dialogo de confirmación
    });//Desde el HTML cerramos el dialogo con un TRUE o FALSE

    dialogRef.afterClosed()//Una vez cerrado el dialogo de confirmación, emitimos un Observable
    .pipe(
      filter( (result: boolean) => result),//Filtramos solo si se confirma la eliminacion (TRUE)
      switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id)),//Cambiamos al observable que elimina un héroe por ID
      filter( (deleted: boolean) => deleted ),//Filtra cuando deleted sea (TRUE) indicando que se eliminó con Éxito
    )
    .subscribe( () => {//Nos suscribimos al observable resultanto despues de la eliminiación
          this.router.navigate(['/heroes']);//Retornamos la ruta especificada
    });

  }

  showSnackBar( message: string ): void {//Devuelve un cartelito de accion confrimada
    this.snackBar.open( message, 'done', {//snackBar método de Angular Material, y le especificamos que fue completado
      duration: 2500,//Definimos el tiempo que se mostrará el cartelito despues de confirmar la acción
    })
  }

}
