// @module: commonjs
// @target: es2015
// @declaration: true
// @lib: es6
// @filename: context.ts
export const Key = Symbol();
export interface Context {
  [Key]: string;
}
// @filename: index.ts
import { Key, Context } from "./context";

export const context: Context = {
  [Key]: 'bar',
}

export const withContext = ({ [Key]: value }: Context) => value;