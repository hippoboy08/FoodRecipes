import * as ShoppingListActions from '../store/shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";

export interface AppStates {
  shoppingList: State
}

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      state.ingredients[state.editedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients: state.ingredients,
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      state.ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: state.ingredients,
      }
    case ShoppingListActions.START_EDIT_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients,
        editedIngredient: state.ingredients[action.index],
        editedIngredientIndex: action.index
      }
    case ShoppingListActions.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}