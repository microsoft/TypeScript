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
        bar: bar
    };
})(foo || (foo = {}));


//// [declarationFunctionTypeNonlocalShouldNotBeAnError.d.ts]
declare namespace foo {
    function bar(): void;
    export const obj: {
        bar: typeof bar;
    };
    export {};
}
