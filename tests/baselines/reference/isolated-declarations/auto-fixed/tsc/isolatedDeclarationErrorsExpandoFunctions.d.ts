//// [tests/cases/compiler/isolatedDeclarationErrorsExpandoFunctions.ts] ////

//// [isolatedDeclarationErrorsExpandoFunctions.ts]
export function foo(): void {}

foo.apply = () => {}
foo.call = ()=> {}
foo.bind = ()=> {}
foo.caller = ()=> {}
foo.toString = ()=> {}
foo.length = 10
foo.length = 10


/// [Declarations] ////



//// [isolatedDeclarationErrorsExpandoFunctions.d.ts]
export declare function foo(): void;
export declare namespace foo {
    var apply: () => void;
    var call: () => void;
    var bind: () => void;
    var caller: () => void;
    var toString: () => void;
    var length: number;
}
