// @strict

// @Filename: constants.ts
export const COFFEE = 0;
export const TEA = 1;


// @Filename: drink.ts
export type Drink = 0 | 1;
export * as Drink from "./constants";


// @Filename: index.ts
import { Drink } from "./drink";
// 'Drink' only refers to a type, but is being used as a value here
const x: Drink = Drink.TEA;
