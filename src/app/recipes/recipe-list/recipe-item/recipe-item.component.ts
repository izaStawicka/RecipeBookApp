import { Component,Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  constructor(private recipeService: RecipeService){}

  @Input() recipe: Recipe;

  onRecipeSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
