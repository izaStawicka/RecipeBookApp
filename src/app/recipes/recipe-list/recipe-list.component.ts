import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { outputAst } from '@angular/compiler';
import { RecipeService } from 'src/app/services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy{
  constructor(private recipeService: RecipeService){}
  recipes: Recipe[];
  recipesSubscription: Subscription;

  ngOnInit(): void {
   this.recipes = this.recipeService.getRecipes();
   this. recipesSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[])=> {
    this.recipes = recipes
   })
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
