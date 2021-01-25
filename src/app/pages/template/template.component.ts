import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  }

  paises: any[] = [];
  constructor( private paisesService: PaisesService ) { 
    this.paisesService.getPaises().subscribe( paises => {
      this.paises = paises;
      console.log(this.paises);
      this.paises.unshift({
        nombre: '[ Seleccione un País ]',
        codigo: ''
      });
    });
  }

  ngOnInit(): void {
  }

  guardar( form:NgForm ){
    console.log(form.controls);
    if( form.invalid ){
      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
