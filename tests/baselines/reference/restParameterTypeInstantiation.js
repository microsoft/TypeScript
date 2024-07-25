//// [tests/cases/compiler/restParameterTypeInstantiation.ts] ////

//// [restParameterTypeInstantiation.ts]
// Repro from #33823

interface TestGeneric<TG> {
  f: string
  g: TG
}

const removeF = <TX>({ f, ...rest }: TestGeneric<TX>) => {
  return rest
}

const result: number = removeF<number>({ f: '', g: 3 }).g


//// [restParameterTypeInstantiation.js]
"use strict";
// Repro from #33823
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var removeF = function (_a) {
    var f = _a.f, rest = __rest(_a, ["f"]);
    return rest;
};
var result = removeF({ f: '', g: 3 }).g;
