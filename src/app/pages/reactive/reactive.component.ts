import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    console.log(this.form.get('nombre'));
    console.log(this.form.get('pasatiempos'));
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get correoNoValido(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get distritoNoValido(){
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }

  get ciudadNoValido(){
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  get pasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }

  crearFormulario(){
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    });
  }

  cargarDataAlFormulario(){
    //this.form.setValue({ el set value obliga a ponerle valor a todos los atributos el reset no
    this.form.reset({
      nombre: 'juan',
      apellido: 'rodriguez',
      /* correo: '',
      direccion: {
        distrito: '',
        ciudad: ''
      } */
    });
    ['comer', 'dormir'].forEach( valor => this.pasatiempos.push( this.fb.control(valor) ));
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('nuevo elemento', Validators.required) )
  }

  borrarPasatiempo( indice:number){
    this.pasatiempos.removeAt(indice);
  }

  guardar(){
    console.log(this.form);
    if(this.form.invalid){
      Object.values(this.form.controls).forEach( control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAsTouched() );
        }else
        control.markAsTouched();
      });
    }

    //posteo de la informacion
    this.form.reset({
      nombre: 'sin nombre'
    });
  }
}
