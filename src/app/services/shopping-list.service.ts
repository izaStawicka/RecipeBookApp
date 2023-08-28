import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService{
  private ingredients:Ingredient[] = [new Ingredient('Apple', 5), new Ingredient('Tomato', 2)];

  ingedientsChanged = new EventEmitter<Ingredient[]>();

  AddNewIngredient(ingredient:Ingredient){
    // this.ingredients.push(ingredient);

    const isIngredient = this.ingredients.find((ing) => {
      return ing.name === ingredient.name;
    })

    if(isIngredient){
      isIngredient.amount += ingredient.amount
    }else{
      this.ingredients.push(ingredient);
    }
    this.ingedientsChanged.emit(this.ingredients.slice());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(ingredientsFromRecipe: Ingredient[]){
    ingredientsFromRecipe.forEach((ingFromRecipe) => {
      this.AddNewIngredient(ingFromRecipe)
    })

    this.ingedientsChanged.emit(this.ingredients.slice());
  }
}
