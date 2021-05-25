/// <reference path='fourslash.ts' />

// @filename: node_modules/io-ts/index.ts
////export type Errors = Array<{ message: string }>;

// @filename: state.ts
////import * as t from 'io-ts';
////export declare const getErrors: () => t.Errors;

// @filename: main.ts
////import { getErrors } from './state';
////export const fn = () => {
////    const state = getErrors();
////    const test = /*a*/{ state }/*b*/;
////};

goTo.file("main.ts");
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in module scope",
    newContent:
`import { Errors } from 'io-ts';
import { getErrors } from './state';
export const fn = () => {
    const state = getErrors();
    const test = /*RENAME*/newFunction(state);
};

function newFunction(state: Errors) {
    return { state };
}
`
});
