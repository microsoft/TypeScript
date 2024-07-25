//// [tests/cases/compiler/spreadExpressionContextualTypeWithNamespace.ts] ////

//// [spreadExpressionContextualTypeWithNamespace_0.ts]
// Repro from #44179 with some modification

function func() {}
class klass {}
const obj = { x: true };

export { func, klass, obj };

export function exportedDirectly() {}

//// [spreadExpressionContextualTypeWithNamespace_1.ts]
import * as stuff from "./spreadExpressionContextualTypeWithNamespace_0";

stuff.func;
stuff.klass;
stuff.obj;
stuff.exportedDirectly;

function getStuff<T>() {
  const thing = { ...stuff };
  thing.func;
  thing.klass;
  thing.obj;
  thing.exportedDirectly;
  return thing;
}

getStuff().func;
getStuff().klass;
getStuff().obj;
getStuff().exportedDirectly;


//// [spreadExpressionContextualTypeWithNamespace_0.js]
"use strict";
// Repro from #44179 with some modification
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = exports.klass = void 0;
exports.func = func;
exports.exportedDirectly = exportedDirectly;
function func() { }
var klass = /** @class */ (function () {
    function klass() {
    }
    return klass;
}());
exports.klass = klass;
var obj = { x: true };
exports.obj = obj;
function exportedDirectly() { }
//// [spreadExpressionContextualTypeWithNamespace_1.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
var stuff = require("./spreadExpressionContextualTypeWithNamespace_0");
stuff.func;
stuff.klass;
stuff.obj;
stuff.exportedDirectly;
function getStuff() {
    var thing = __assign({}, stuff);
    thing.func;
    thing.klass;
    thing.obj;
    thing.exportedDirectly;
    return thing;
}
getStuff().func;
getStuff().klass;
getStuff().obj;
getStuff().exportedDirectly;
