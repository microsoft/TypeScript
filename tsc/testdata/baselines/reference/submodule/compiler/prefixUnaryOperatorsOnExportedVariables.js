//// [tests/cases/compiler/prefixUnaryOperatorsOnExportedVariables.ts] ////

//// [prefixUnaryOperatorsOnExportedVariables.ts]
export var x = false;
export var y = 1;
if (!x) {
    
}

if (+x) {
    
}

if (-x) {
    
}

if (~x) {
    
}

if (void x) {
    
}

if (typeof x) {
    
}

if (++y) {
    
}

//// [prefixUnaryOperatorsOnExportedVariables.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = false;
exports.y = 1;
if (!exports.x) {
}
if (+exports.x) {
}
if (-exports.x) {
}
if (~exports.x) {
}
if (void exports.x) {
}
if (typeof exports.x) {
}
if (++exports.y) {
}
