import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService){}

  @ViewChild('inputName', {static: true}) ingredientName: ElementRef;

  onAddIngredient(inputAmount){
    const newIngredient = new Ingredient(this.ingredientName.nativeElement.value, +inputAmount.value)
    this.shoppingListService.AddNewIngredient(newIngredient)
  }
}
