import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  id: number;
  editMode = false;
  form: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      })
  }

  private initForm(){
    let name='';
    let imagePath = '';
    let description='';
    let ingredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath=recipe.imagePath;
      description=recipe.description;
      if(recipe['ingredients']){
        recipe.ingredients.forEach(ingredient => {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        });
      }
    }
    this.form = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    })
  }

  getControls(){
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.form.value);
    }else{
      this.recipeService.addRecipe(this.form.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
}
