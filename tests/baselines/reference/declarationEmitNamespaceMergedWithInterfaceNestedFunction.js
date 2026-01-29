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
var Bar;
(function (Bar) {
    function biz() {
        return 0;
    }
    Bar.biz = biz;
})(Bar || (Bar = {}));
export {};


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
