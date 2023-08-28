import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService{
  constructor(private shoppingListService: ShoppingListService){}

  recipeSelected = new EventEmitter<Recipe>();

  private recipes:Recipe[] = [new Recipe('Pancakes', 'Pancakes with berries', 'https://cdn.aniagotuje.com/pictures/articles/2023/02/38480090-v-1080x1080.jpg',
    [new Ingredient('Eggs', 4), new Ingredient('Flour', 500)]),
    new Recipe('Pierogi', 'Delicious Polish pierogi', 'https://mieszamwgarnku.pl/wp-content/uploads/2015/07/pierogizjagodai3.jpg',
    [new Ingredient('Cottage cheese', 300), new Ingredient('Cream', 100)])];

    getRecipes(){
      return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.shoppingListService.addIngredients(ingredients)
    }
}
