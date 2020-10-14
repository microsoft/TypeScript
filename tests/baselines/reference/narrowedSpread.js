//// [narrowedSpread.ts]
type Obj = { x: number };
function go(obj: Obj) { }

function fn(arg: { x?: number }) {
    arg.x && go({ ...arg });
}


//// [narrowedSpread.js]
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
function go(obj) { }
function fn(arg) {
    arg.x && go(__assign({}, arg));
}
