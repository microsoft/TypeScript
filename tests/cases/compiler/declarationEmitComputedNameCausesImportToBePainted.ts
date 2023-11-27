// @declaration: true
// @lib: es6
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed
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