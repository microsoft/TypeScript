//// [tests/cases/compiler/nestedLoops.ts] ////

//// [nestedLoops.ts]
export class Test  {
    constructor() {

        let outerArray: Array<number> = [1, 2, 3];
        let innerArray: Array<number> = [1, 2, 3];

        for (let outer of outerArray)
            for (let inner of innerArray) {
                this.aFunction((newValue, oldValue) => {
                    let x = outer + inner + newValue;
                });
            }
    }

    public aFunction(func: (newValue: any, oldValue: any) => void): void {
    }
}

//// [nestedLoops.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
var Test = /** @class */ (function () {
    function Test() {
        var outerArray = [1, 2, 3];
        var innerArray = [1, 2, 3];
        var _loop_1 = function (outer) {
            var _loop_2 = function (inner) {
                this_1.aFunction(function (newValue, oldValue) {
                    var x = outer + inner + newValue;
                });
            };
            for (var _a = 0, innerArray_1 = innerArray; _a < innerArray_1.length; _a++) {
                var inner = innerArray_1[_a];
                _loop_2(inner);
            }
        };
        var this_1 = this;
        for (var _i = 0, outerArray_1 = outerArray; _i < outerArray_1.length; _i++) {
            var outer = outerArray_1[_i];
            _loop_1(outer);
        }
    }
    Test.prototype.aFunction = function (func) {
    };
    return Test;
}());
exports.Test = Test;
