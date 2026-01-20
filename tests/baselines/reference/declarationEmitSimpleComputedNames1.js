//// [tests/cases/compiler/declarationEmitSimpleComputedNames1.ts] ////

//// [declarationEmitSimpleComputedNames1.ts]
export const fieldName = Math.random() > 0.5 ? "f1" : "f2";
export const conatainer = {
    [fieldName]() {
        return "result";
    }
};

const classFieldName = Math.random() > 0.5 ? "g1" : "g2";
const otherField = classFieldName === "g1" ? "g2" : "g1";
const staticField = Math.random() > 0.5 ? "s1" : "s2";
export class Holder {
    [classFieldName]() {
        return "value";
    }
    [otherField]() {
        return 42;
    }
    static [staticField]() {
        return { static: true };
    }
    static [staticField]() {
        return { static: "sometimes" };
    }
}

/**
 * Could be `"prototype"`, so all static string indexers include the instance type
 */
export const staticLookup = Holder["some" + "thing"];
export const instanceLookup = (new Holder())["some" + "thing"];


//// [declarationEmitSimpleComputedNames1.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceLookup = exports.staticLookup = exports.Holder = exports.conatainer = exports.fieldName = void 0;
exports.fieldName = Math.random() > 0.5 ? "f1" : "f2";
exports.conatainer = (_a = {},
    _a[exports.fieldName] = function () {
        return "result";
    },
    _a);
var classFieldName = Math.random() > 0.5 ? "g1" : "g2";
var otherField = classFieldName === "g1" ? "g2" : "g1";
var staticField = Math.random() > 0.5 ? "s1" : "s2";
var Holder = /** @class */ (function () {
    function Holder() {
    }
    Holder.prototype[classFieldName] = function () {
        return "value";
    };
    Holder.prototype[otherField] = function () {
        return 42;
    };
    Holder[staticField] = function () {
        return { static: true };
    };
    Holder[staticField] = function () {
        return { static: "sometimes" };
    };
    return Holder;
}());
exports.Holder = Holder;
/**
 * Could be `"prototype"`, so all static string indexers include the instance type
 */
exports.staticLookup = Holder["some" + "thing"];
exports.instanceLookup = (new Holder())["some" + "thing"];


//// [declarationEmitSimpleComputedNames1.d.ts]
export declare const fieldName: string;
export declare const conatainer: {
    [fieldName]: () => string;
};
declare const classFieldName: string;
declare const otherField: string;
declare const staticField: string;
export declare class Holder {
    static [staticField]: () => {
        static: boolean;
    };
    static [staticField]: () => {
        static: string;
    };
    [classFieldName]: () => string;
    [otherField]: () => number;
}
/**
 * Could be `"prototype"`, so all static string indexers include the instance type
 */
export declare const staticLookup: Holder | (() => {
    static: boolean;
}) | (() => {
    static: string;
});
export declare const instanceLookup: (() => string) | (() => number);
export {};
