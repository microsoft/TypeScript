//// [controlFlowAliasFunc1.ts]
declare type Foo = { foo: ()=> number[] }; 
declare const obj: undefined | Foo;
const isFoo = obj?.foo();
if (isFoo){
    obj.foo();
}

//// [controlFlowAliasFunc1.js]
"use strict";
var isFoo = obj === null || obj === void 0 ? void 0 : obj.foo();
if (isFoo) {
    obj.foo();
}


//// [controlFlowAliasFunc1.d.ts]
declare type Foo = {
    foo: () => number[];
};
declare const obj: undefined | Foo;
declare const isFoo: number[] | undefined;
