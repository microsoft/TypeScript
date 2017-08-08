//// [typeInferenceLiteralUnion.ts]
// Repro from #10901
/**
 * Administrivia: JavaScript primitive types and Date
 */
export type Primitive = number | string | boolean | Date;

/**
 * Administrivia: anything with a valueOf(): number method is comparable, so we allow it in numeric operations
 */
interface Numeric {
    valueOf(): number;
}

// Not very useful, but meets Numeric
class NumCoercible {
    public a: number;

    constructor(a: number) {
        this.a = a;
    }
    public valueOf() {
        return this.a;
    }
}

/**
 * Return the min and max simultaneously.
 */
export function extent<T extends Numeric>(array: Array<T | Primitive>): [T | Primitive, T | Primitive] | [undefined, undefined] {
    return [undefined, undefined];
}


let extentMixed: [Primitive | NumCoercible, Primitive | NumCoercible] | [undefined, undefined];
extentMixed = extent([new NumCoercible(10), 13, '12', true]);


//// [typeInferenceLiteralUnion.js]
"use strict";
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
exports.__esModule = true;
// Not very useful, but meets Numeric
var NumCoercible = (function () {
    function NumCoercible(a) {
        this.a = a;
    }
    NumCoercible.prototype.valueOf = function () {
        return this.a;
    };
    __names(NumCoercible.prototype, ["valueOf"]);
    return NumCoercible;
}());
/**
 * Return the min and max simultaneously.
 */
function extent(array) {
    return [undefined, undefined];
}
exports.extent = extent;
var extentMixed;
extentMixed = extent([new NumCoercible(10), 13, '12', true]);
