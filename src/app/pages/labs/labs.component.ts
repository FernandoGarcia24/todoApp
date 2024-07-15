import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido';
  tasks = signal([
    'Instalar el Angular Cli',
    'Crear proyecto',
    'Crear componentes'
  ]);

  disable = true;

  name = signal('Fernando');
  age = 22;
  avatar = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Fernando',
    age: 22,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }

  colorCtrl = new FormControl();
  widthCRTL = new FormControl(50, {
    nonNullable: true
  });
  nameCRTL = new FormControl(50, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  clickHandler() {
    alert('Hola')
  }

  clickHandlerDouble() {
    alert('Hola Mundo')
  }

  changeHanddler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

}
