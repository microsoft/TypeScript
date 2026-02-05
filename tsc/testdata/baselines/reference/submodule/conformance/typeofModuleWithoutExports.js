//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeofModuleWithoutExports.ts] ////

//// [typeofModuleWithoutExports.ts]
namespace M {
    var x = 1;
    class C {
        foo: number;
    }
}

var r: typeof M;

//// [typeofModuleWithoutExports.js]
"use strict";
var M;
(function (M) {
    var x = 1;
    class C {
        foo;
    }
})(M || (M = {}));
var r;
