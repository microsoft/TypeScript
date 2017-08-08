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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
Object.defineProperty(exports, "__esModule", { value: true });
var Test = (function () {
    function Test() {
        var outerArray = [1, 2, 3];
        var innerArray = [1, 2, 3];
        var _loop_1 = function (outer) {
            var _loop_2 = function (inner) {
                this_1.aFunction(function (newValue, oldValue) {
                    var x = outer + inner + newValue;
                });
            };
            for (var _i = 0, innerArray_1 = innerArray; _i < innerArray_1.length; _i++) {
                var inner = innerArray_1[_i];
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
    __names(Test.prototype, ["aFunction"]);
    return Test;
}());
exports.Test = Test;
