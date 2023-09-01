import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { EditRecipeComponent } from "./recipes/edit-recipe/edit-recipe.component";

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children:[
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: EditRecipeComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: EditRecipeComponent}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModele{

}
