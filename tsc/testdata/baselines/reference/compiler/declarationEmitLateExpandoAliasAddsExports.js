//// [tests/cases/compiler/declarationEmitLateExpandoAliasAddsExports.ts] ////

//// [declarationEmitLateExpandoAliasAddsExports.ts]
function helper(): number { return 1; }
export function Host() {}
Host.first = 1;
Host.second = 'two';
Host.alias = helper;

//// [declarationEmitLateExpandoAliasAddsExports.js]
function helper() { return 1; }
export function Host() { }
Host.first = 1;
Host.second = 'two';
Host.alias = helper;


//// [declarationEmitLateExpandoAliasAddsExports.d.ts]
declare function helper(): number;
export declare function Host(): void;
export declare namespace Host {
    export var first: number;
    export var second: string;
    export { helper as alias };
}
export {};
