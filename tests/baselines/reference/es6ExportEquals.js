//// [es6ExportEquals.ts]
export function f() { }

export = f;


//// [es6ExportEquals.js]
export function f() { }


//// [es6ExportEquals.d.ts]
export declare function f(): void;
export = f;
