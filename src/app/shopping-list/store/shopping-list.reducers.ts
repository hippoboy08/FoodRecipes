import * as ShoppingListActions from '../store/shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";

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
  // console.log(action);
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
      let newIngredients = [...state.ingredients];
      /* We don't update the ingredient inplace, it would be against the NgRx objective
       e.g (state.ingredients[state.editedIngredientIndex] = action.payload;) */
      const updatedIngredient = {
        // old ingredient
        ...state.ingredients[state.editedIngredientIndex],
        /* this spead operator will overwrite only data it has in common with old ingredient, 
        in case every ingredient has auto-generated ID which need to be unique & it shouldn't be replace */
        ...action.payload
      };
      newIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: newIngredients,
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        /* array.filter() will return copy of the original array, then we could use it in here */
        ingredients: state.ingredients.filter((ingredient, index) => index !== state.editedIngredientIndex),
      }
    case ShoppingListActions.START_EDIT_INGREDIENT:      
      return {
        ...state,
        // ingredients: state.ingredients,
        editedIngredient: {...state.ingredients[action.index]},
        editedIngredientIndex: action.index
      }
    case ShoppingListActions.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        // ingredients: state.ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}