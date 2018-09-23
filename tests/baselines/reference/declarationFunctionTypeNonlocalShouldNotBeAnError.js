//// [declarationFunctionTypeNonlocalShouldNotBeAnError.ts]
namespace foo {
    function bar(): void {}

    export const obj = {
        bar
    }
}


//// [declarationFunctionTypeNonlocalShouldNotBeAnError.js]
var foo = foo || (foo = {});
(function (foo) {
    function bar() { }
    foo.obj = {
        bar: bar
    };
})(foo);


//// [declarationFunctionTypeNonlocalShouldNotBeAnError.d.ts]
declare namespace foo {
    function bar(): void;
    const obj: {
        bar: typeof bar;
    };
}
