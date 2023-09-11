import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  constructor(private shoppingListService: ShoppingListService){}

  ingredients:Ingredient[];
  ingChangedSub: Subscription;

  ngOnInit(): void {
    this.ingredients= this.shoppingListService.getIngredients();
    this.ingChangedSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients) => {
      this.ingredients = ingredients
    })
  }

  onStartEditing(index: number){
    this.shoppingListService.onStartEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingChangedSub.unsubscribe();
  }
}
