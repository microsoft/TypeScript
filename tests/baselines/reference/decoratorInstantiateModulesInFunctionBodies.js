//// [tests/cases/conformance/decorators/class/decoratorInstantiateModulesInFunctionBodies.ts] ////

//// [a.ts]
// from #3108
export var test = 'abc';

//// [b.ts]
import { test } from './a';

function filter(handler: any) {
    return function (target: any, propertyKey: string) {
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
// from #3108
exports.test = 'abc';
//// [b.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
function filter(handler) {
    return function (target, propertyKey) {
        // ...
    };
}
var Wat = /** @class */ (function () {
    function Wat() {
    }
    Wat.whatever = function () {
        // ...
    };
    __decorate([
        filter(function () { return a_1.test == 'abc'; })
    ], Wat, "whatever", null);
    return Wat;
}());
