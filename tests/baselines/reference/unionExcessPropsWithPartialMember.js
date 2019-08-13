//// [unionExcessPropsWithPartialMember.ts]
interface A {
    unused?: string;
    x: string;
}

interface B {
    x: string;
    y: string;
}

declare var ab: A | B;
declare var a: A;

ab = {...a, y: (null as any as string | undefined)}; // Should be allowed, since `y` is missing on `A`


//// [unionExcessPropsWithPartialMember.js]
"use strict";
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
ab = __assign(__assign({}, a), { y: null }); // Should be allowed, since `y` is missing on `A`
