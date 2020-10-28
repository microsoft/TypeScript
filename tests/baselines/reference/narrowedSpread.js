//// [narrowedSpread.ts]
function useX(obj: { x: number }) { }
function fn1(arg: { x?: number }) {
    arg.x && useX({ ...arg });
}

function useXYZ(obj: { w: number; x: number; y: number; z: number }) { }
function fn2(arg: { x?: number; y: number | null; z: string | number }) {
    if (arg.x && arg.y !== null) {
        if (typeof arg.z === "number") {
            useXYZ({ ...arg, w: 100 });
        }
    }
} 

type None = { type: "none" };
type Some<T> = { type: "some"; value: T };
type Option<T> = None | Some<T>;
function useSome<T>(obj: { opt: Some<T> }) { }

function fn3<T>(arg: { opt: Option<T> }) {
    if (arg.opt.type === "some") {
        useSome({ ...arg });
    }
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
function useX(obj) { }
function fn1(arg) {
    arg.x && useX(__assign({}, arg));
}
function useXYZ(obj) { }
function fn2(arg) {
    if (arg.x && arg.y !== null) {
        if (typeof arg.z === "number") {
            useXYZ(__assign(__assign({}, arg), { w: 100 }));
        }
    }
}
function useSome(obj) { }
function fn3(arg) {
    if (arg.opt.type === "some") {
        useSome(__assign({}, arg));
    }
}
