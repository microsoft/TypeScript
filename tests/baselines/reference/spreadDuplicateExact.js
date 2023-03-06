//// [spreadDuplicateExact.ts]
// Repro from #44438

declare let a: { a: string };
declare let b: { a?: string };
declare let c: { a: string | undefined };
declare let d: { a?: string | undefined };

declare let t: boolean;

let a1 = { a: 123, ...a };  // string (Error)
let b1 = { a: 123, ...b };  // string | number
let c1 = { a: 123, ...c };  // string | undefined (Error)
let d1 = { a: 123, ...d };  // string | number | undefined

let a2 = { a: 123, ...(t ? a : {}) };  // string | number
let b2 = { a: 123, ...(t ? b : {}) };  // string | number
let c2 = { a: 123, ...(t ? c : {}) };  // string | number | undefined
let d2 = { a: 123, ...(t ? d : {}) };  // string | number | undefined


//// [spreadDuplicateExact.js]
"use strict";
// Repro from #44438
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
var a1 = __assign({ a: 123 }, a); // string (Error)
var b1 = __assign({ a: 123 }, b); // string | number
var c1 = __assign({ a: 123 }, c); // string | undefined (Error)
var d1 = __assign({ a: 123 }, d); // string | number | undefined
var a2 = __assign({ a: 123 }, (t ? a : {})); // string | number
var b2 = __assign({ a: 123 }, (t ? b : {})); // string | number
var c2 = __assign({ a: 123 }, (t ? c : {})); // string | number | undefined
var d2 = __assign({ a: 123 }, (t ? d : {})); // string | number | undefined


//// [spreadDuplicateExact.d.ts]
declare let a: {
    a: string;
};
declare let b: {
    a?: string;
};
declare let c: {
    a: string | undefined;
};
declare let d: {
    a?: string | undefined;
};
declare let t: boolean;
declare let a1: {
    a: string;
};
declare let b1: {
    a: string | number;
};
declare let c1: {
    a: string | undefined;
};
declare let d1: {
    a: string | number | undefined;
};
declare let a2: {
    a: string | number;
};
declare let b2: {
    a: string | number;
};
declare let c2: {
    a: string | number | undefined;
};
declare let d2: {
    a: string | number | undefined;
};
