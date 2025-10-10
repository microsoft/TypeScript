//// [tests/cases/compiler/isolatedDeclarationErrorsExpandoFunctions.ts] ////

//// [isolatedDeclarationErrorsExpandoFunctions.ts]
export function foo() {}

foo.apply = () => {}
foo.call = ()=> {}
foo.bind = ()=> {}
foo.caller = ()=> {}
foo.toString = ()=> {}
foo.length = 10
foo.length = 10


//// [isolatedDeclarationErrorsExpandoFunctions.js]
export function foo() { }
foo.apply = () => { };
foo.call = () => { };
foo.bind = () => { };
foo.caller = () => { };
foo.toString = () => { };
foo.length = 10;
foo.length = 10;


//// [isolatedDeclarationErrorsExpandoFunctions.d.ts]
export declare function foo(): void;
export declare namespace foo {
    var apply: () => void;
}
export declare namespace foo {
    var call: () => void;
}
export declare namespace foo {
    var bind: () => void;
}
export declare namespace foo {
    var caller: () => void;
}
export declare namespace foo {
    var toString: () => void;
}
export declare namespace foo {
    var length: number;
}
export declare namespace foo {
    var length: number;
}
