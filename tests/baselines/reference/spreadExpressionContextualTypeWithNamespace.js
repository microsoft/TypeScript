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
class klass {
}
exports.klass = klass;
const obj = { x: true };
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const stuff = __importStar(require("./spreadExpressionContextualTypeWithNamespace_0"));
stuff.func;
stuff.klass;
stuff.obj;
stuff.exportedDirectly;
function getStuff() {
    const thing = __assign({}, stuff);
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
