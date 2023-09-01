import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService{
  private ingredients:Ingredient[] = [new Ingredient('Apple', 5), new Ingredient('Tomato', 2)];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  // AddNewIngredient(ingredient:Ingredient){
  //   // this.ingredients.push(ingredient);

  //   const isIngredient = this.ingredients.find((ing) => {
  //     return ing.name === ingredient.name;
  //   })

  //   if(isIngredient){
  //     isIngredient.amount += ingredient.amount
  //   }else{
  //     this.ingredients.push(ingredient);
  //   }
  //   this.ingedientsChanged.emit(this.ingredients.slice());
  // }

  getIngredients(){
    return this.ingredients.slice();
  }

  // addIngredients(ingredientsFromRecipe: Ingredient[]){
  //   ingredientsFromRecipe.forEach((ingFromRecipe) => {
  //     this.AddNewIngredient(ingFromRecipe)
  //   })

  //   this.ingedientsChanged.emit(this.ingredients.slice());
  // }
  AddNewIngredient(ingredient: Ingredient, publishChanges = true) {
    const index = this.ingredients.findIndex(ing => ing.name === ingredient.name);
    if (index === -1) {
      this.ingredients.push(ingredient);
    } else {
      this.ingredients[index].amount += ingredient.amount;
    }
    if (publishChanges) {
      this.ingredientsChanged.emit(this.ingredients.slice());
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ing => this.AddNewIngredient(ing, false));
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
