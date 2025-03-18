//// [tests/cases/compiler/declarationFunctionTypeNonlocalShouldNotBeAnError.ts] ////

//// [declarationFunctionTypeNonlocalShouldNotBeAnError.ts]
namespace foo {
    function bar(): void {}

    export const obj = {
        bar
    }
}


//// [declarationFunctionTypeNonlocalShouldNotBeAnError.js]
var foo;
(function (foo) {
    function bar() { }
    foo.obj = {
        bar
    };
})(foo || (foo = {}));
