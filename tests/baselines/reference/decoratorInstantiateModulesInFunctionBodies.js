//// [tests/cases/conformance/decorators/class/decoratorInstantiateModulesInFunctionBodies.ts] ////

//// [a.ts]

// from #3108
export var test = 'abc';

//// [b.ts]
import { test } from './a';

function filter(handler: any) {
    return function (target: any) {
        // ...
    };
}

class Wat {
    @filter(() => test == 'abc')
    static whatever() {
        // ...
    }
}

//// [a.js]
// from #3108
exports.test = 'abc';
//// [b.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var a_1 = require('./a');
function filter(handler) {
    return function (target) {
        // ...
    };
}
var Wat = (function () {
    function Wat() {
    }
    Wat.whatever = function () {
        // ...
    };
    Object.defineProperty(Wat, "whatever",
        __decorate([
            filter(function () { return a_1.test == 'abc'; })
        ], Wat, "whatever", Object.getOwnPropertyDescriptor(Wat, "whatever")));
    return Wat;
})();
