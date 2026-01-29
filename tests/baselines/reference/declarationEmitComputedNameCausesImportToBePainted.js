//// [tests/cases/compiler/declarationEmitComputedNameCausesImportToBePainted.ts] ////

//// [context.ts]
export const Key = Symbol();
export interface Context {
  [Key]: string;
}
//// [index.ts]
import { Key, Context } from "./context";

export const context: Context = {
  [Key]: 'bar',
}

export const withContext = ({ [Key]: value }: Context) => value;

//// [context.js]
export const Key = Symbol();
//// [index.js]
import { Key } from "./context";
export const context = {
    [Key]: 'bar',
};
export const withContext = ({ [Key]: value }) => value;


//// [context.d.ts]
export declare const Key: unique symbol;
export interface Context {
    [Key]: string;
}
//// [index.d.ts]
import { Key, Context } from "./context";
export declare const context: Context;
export declare const withContext: ({ [Key]: value }: Context) => string;
