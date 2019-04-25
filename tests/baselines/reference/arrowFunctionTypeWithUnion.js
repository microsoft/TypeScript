//// [arrowFunctionTypeWithUnion.ts]
declare const a: string | (a: string, b: boolean) => string
declare const b: string | () => string
declare const c: string | () => string | number | () => boolean


//// [arrowFunctionTypeWithUnion.js]
