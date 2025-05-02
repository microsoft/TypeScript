//// [tests/cases/compiler/declarationEmitNamespaceMergedWithInterfaceNestedFunction.ts] ////

//// [declarationEmitNamespaceMergedWithInterfaceNestedFunction.ts]
export interface Foo {
    item: Bar;
}

interface Bar {
    baz(): void;
}

namespace Bar {
    export function biz() {
        return 0;
    }
}

//// [declarationEmitNamespaceMergedWithInterfaceNestedFunction.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bar;
(function (Bar) {
    function biz() {
        return 0;
    }
    Bar.biz = biz;
})(Bar || (Bar = {}));


//// [declarationEmitNamespaceMergedWithInterfaceNestedFunction.d.ts]
export interface Foo {
    item: Bar;
}
interface Bar {
    baz(): void;
}
declare namespace Bar {
    function biz(): number;
}
export {};
