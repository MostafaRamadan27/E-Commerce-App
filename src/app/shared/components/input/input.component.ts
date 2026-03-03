import { Component, Input } from '@angular/core';
import {  ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-input',
  imports: [ ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
@Input() control:any
@Input() idInput!:string
@Input() labelInput!:string
@Input() typeInput!:string
@Input() element:string = 'input'
flag : boolean = true
}
