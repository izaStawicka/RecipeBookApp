import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  constructor(private shoppingListService: ShoppingListService){}

  @ViewChild('f') form: NgForm;

  editMode = false;
  ingredientNumber: number;
  editedIngredientSubscription: Subscription;
  editedIngredient: Ingredient;

  ngOnInit(){
    this.editedIngredientSubscription = this.shoppingListService.onStartEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.ingredientNumber = index;
        this.editedIngredient = this.shoppingListService.getItem(index);
        this.form.setValue({
          name : this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.editIngredient(this.ingredientNumber, newIngredient);
    }else{
      this.shoppingListService.AddNewIngredient(newIngredient);
    }
    this.editMode=false;
    this.form.reset();
  }

  onClear(){
    this.form.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.ingredientNumber);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editedIngredientSubscription.unsubscribe();
  }
}
