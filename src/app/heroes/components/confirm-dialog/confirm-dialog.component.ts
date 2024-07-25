import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: []
})
export class ConfirmDialogComponent {//Lo utilizamos para msotrar un cuadro de dialogo

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,//represetna el dialogo y proporciona metodos para manipularlo(como cerrarlo)
    @Inject(MAT_DIALOG_DATA) public data: Hero,//Inyecta lso datos que se pasan al dialogo (espera un Héroe), data es la variable que los tiene.
  ) {}

  onNoClick():void {
    this.dialogRef.close(false);//Si el usuario hace click en No cierra el dialogo con FALSE
  }

  onConfirm():void {
    this.dialogRef.close(true);//Si el usuario hace click en No cierra el dialogo con TRUE
  }

}
