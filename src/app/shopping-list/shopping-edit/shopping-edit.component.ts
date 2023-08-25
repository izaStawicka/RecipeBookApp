import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('inputName', {static: true}) ingredientName: ElementRef;
  @Output() ingredientEmited = new EventEmitter<Ingredient>()

  @Output() newIngredient = new EventEmitter<Ingredient>()
  onAddIngredient(inputAmount){
    const newIngredient = new Ingredient(this.ingredientName.nativeElement.value, inputAmount.value)
    this.ingredientEmited.emit(newIngredient)
  }
}
