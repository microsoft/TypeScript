//// [tests/cases/compiler/es6ExportDefaultIdentifier.ts] ////

//// [es6ExportDefaultIdentifier.ts]
export function f() { }

export default f;


//// [es6ExportDefaultIdentifier.js]
export function f() { }
export default f;


//// [es6ExportDefaultIdentifier.d.ts]
export declare function f(): void;
export default f;
