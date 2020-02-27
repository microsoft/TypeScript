//// [capturedParametersInInitializers1.ts]
// ok - usage is deferred
function foo1(y = class {c = x}, x = 1) {
    new y().c;
}

// ok - used in file
function foo2(y = function(x: typeof z) {}, z = 1) {
    
}

// ok -used in type
let a;
function foo3(y = { x: <typeof z>a }, z = 1) {
    
}

// error - used before declaration
function foo4(y = {z}, z = 1) {
}

// error - used before declaration, IIFEs are inlined
function foo5(y = (() => z)(), z = 1) {
}

// ok - IIFE inside another function
function foo6(y = () => (() => z)(), z = 1) {
}

// ok - used inside immediately invoked generator function
function foo7(y = (function*() {yield z})(), z = 1) {
}

// ok - used inside immediately invoked async function
function foo8(y = (async () => z)(), z = 1) {
}

// error - used as computed name of method
function foo9(y = {[z]() { return z; }}, z = 1) {
}


//// [capturedParametersInInitializers1.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ok - usage is deferred
function foo1(y = class {
    constructor() {
        this.c = x;
    }
}, x = 1) {
    new y().c;
}
// ok - used in file
function foo2(y = function (x) { }, z = 1) {
}
// ok -used in type
let a;
function foo3(y = { x: a }, z = 1) {
}
// error - used before declaration
function foo4(y = { z }, z = 1) {
}
// error - used before declaration, IIFEs are inlined
function foo5(y = (() => z)(), z = 1) {
}
// ok - IIFE inside another function
function foo6(y = () => (() => z)(), z = 1) {
}
// ok - used inside immediately invoked generator function
function foo7(y = (function* () { yield z; })(), z = 1) {
}
// ok - used inside immediately invoked async function
function foo8(y = (() => __awaiter(this, void 0, void 0, function* () { return z; }))(), z = 1) {
}
// error - used as computed name of method
function foo9(y = { [z]() { return z; } }, z = 1) {
}
