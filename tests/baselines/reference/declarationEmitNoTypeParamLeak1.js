//// [tests/cases/compiler/declarationEmitNoTypeParamLeak1.ts] ////

//// [declarationEmitNoTypeParamLeak1.ts]
type BrokenType<T> = 'a' | 'b';

class MyClass {
    constructor(readonly arg?: BrokenType<any>) {}
}

//// [declarationEmitNoTypeParamLeak1.js]
"use strict";
var MyClass = /** @class */ (function () {
    function MyClass(arg) {
        this.arg = arg;
    }
    return MyClass;
}());


//// [declarationEmitNoTypeParamLeak1.d.ts]
type BrokenType<T> = 'a' | 'b';
declare class MyClass {
    readonly arg?: BrokenType<any> | undefined;
    constructor(arg?: BrokenType<any> | undefined);
}
