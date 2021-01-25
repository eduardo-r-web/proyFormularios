import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;
  constructor( private fb: FormBuilder) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.form = this.fb.group({
      nombre: ['juan'],
      apellido: ['rodriguez'],
      correo: ['juanrm@gmail.com']
    });
  }

  guardar(){
    console.log( this.form );
  }
}
