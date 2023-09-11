import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService{
  private ingredients:Ingredient[] = [new Ingredient('Apple', 5), new Ingredient('Tomato', 2)];

  ingredientsChanged = new Subject<Ingredient[]>();

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
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ing => this.AddNewIngredient(ing, false));
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onStartEditing = new Subject<number>();

  getItem(index: number){
    return this.ingredients[index];
  }

  editIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
