//// [tests/cases/compiler/declarationEmitComputedNamesInaccessible.ts] ////

//// [declarationEmitComputedNamesInaccessible.ts]
export function f1() {
    const localClassFieldName = Math.random() > 0.5 ? "g1" : "g2";
    const localOtherField = localClassFieldName === "g1" ? "g2" : "g1";
    const localStaticField = Math.random() > 0.5 ? "s1" : "s2";
    return class ParameterizedHolder {
        [localClassFieldName]() {
            return "value";
        }
        [localOtherField]() {
            return 42;
        }
        static [localStaticField]() {
            return { static: true };
        }
        static [localStaticField]() {
            return { static: "sometimes" };
        }
    }
}

//// [declarationEmitComputedNamesInaccessible.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f1 = f1;
function f1() {
    var localClassFieldName = Math.random() > 0.5 ? "g1" : "g2";
    var localOtherField = localClassFieldName === "g1" ? "g2" : "g1";
    var localStaticField = Math.random() > 0.5 ? "s1" : "s2";
    return /** @class */ (function () {
        function ParameterizedHolder() {
        }
        ParameterizedHolder.prototype[localClassFieldName] = function () {
            return "value";
        };
        ParameterizedHolder.prototype[localOtherField] = function () {
            return 42;
        };
        ParameterizedHolder[localStaticField] = function () {
            return { static: true };
        };
        ParameterizedHolder[localStaticField] = function () {
            return { static: "sometimes" };
        };
        return ParameterizedHolder;
    }());
}


//// [declarationEmitComputedNamesInaccessible.d.ts]
export declare function f1(): {
    new (): {
        [x: string]: (() => string) | (() => number);
    };
    [x: string]: {
        [x: string]: (() => string) | (() => number);
    } | (() => {
        static: boolean;
    }) | (() => {
        static: string;
    });
};
