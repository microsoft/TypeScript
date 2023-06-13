//// [tests/cases/compiler/spreadExpressionContextualType.ts] ////

//// [spreadExpressionContextualType.ts]
// Repro from #43966

interface Orange {
    name: string;
}

interface Apple {
    name: string;
}

function test<T extends Apple | Orange>(item: T): T {
    return { ...item };
}

function test2<T extends Apple | Orange>(item: T): T {
    const x = { ...item };
    return x;
}


//// [spreadExpressionContextualType.js]
"use strict";
// Repro from #43966
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function test(item) {
    return __assign({}, item);
}
function test2(item) {
    var x = __assign({}, item);
    return x;
}


//// [spreadExpressionContextualType.d.ts]
interface Orange {
    name: string;
}
interface Apple {
    name: string;
}
declare function test<T extends Apple | Orange>(item: T): T;
declare function test2<T extends Apple | Orange>(item: T): T;
