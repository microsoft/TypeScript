//// [tests/cases/compiler/emptyJSDocComment.ts] ////

//// [emptyJSDocComment.ts]
/***/
export const foo = 1;


//// [emptyJSDocComment.js]
/***/
export const foo = 1;


//// [emptyJSDocComment.d.ts]
/***/
export declare const foo = 1;
