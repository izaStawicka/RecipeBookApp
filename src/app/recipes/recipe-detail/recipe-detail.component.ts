import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipes.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit{
  constructor(private recipeService: RecipeService, private route: ActivatedRoute){}

  recipe: Recipe;
  id: number;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
