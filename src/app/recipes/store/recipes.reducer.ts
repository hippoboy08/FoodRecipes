import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.action';
import { Ingredient } from 'src/app/shared/ingredient.model';


export interface State {
  recipes: Recipe[];
  error: string;
}

const initialState: State = {
  error: null,
  recipes: [
    // new Recipe('Spring rolls',
    //   'Vietnamese Food',
    //   'https://img.taste.com.au/AhhCj8s8/w720-h480-cfill-q80/taste/2018/02/chicken-spring-rolls-134846-1.jpg',
    //   [
    //     new Ingredient('Rice Paper', 5),
    //     new Ingredient('Meat', 2)
    //   ]
    // ),
    // new Recipe('Pho',
    //   'Vietnamese Famous Food',
    //   'https://img.taste.com.au/FOmGb0F6/taste/2016/11/chicken-pho-108887-1.jpeg',
    //   [
    //     new Ingredient('Vermicelli', 3),
    //     new Ingredient('Beef', 3)
    //   ]
    // ),
  ]
}

export function recipesReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    // case RecipesActions.actionType.FETCH_RECIPES:
    //   return {
    //     ...state,
    //   }
    case RecipesActions.actionType.SYNC_RECIPES:
      return {
        ...state,
        recipes: action.recipes
      }
    case RecipesActions.actionType.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      }
    case RecipesActions.actionType.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      }
    case RecipesActions.actionType.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => index !== action.index)
      }
    case RecipesActions.actionType.ERROR_MESSAGE:
      return {
        ...state,
        error: action.message
      }
    default:
      return state;
  }
}