//// [tests/cases/compiler/modularizeLibrary_NoErrorDuplicateLibOptions1.ts] ////

//// [modularizeLibrary_NoErrorDuplicateLibOptions1.ts]
// Using Es6 array
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);  // no error

// Using ES6 collection
var m = new Map<string, number>();
m.clear();
// Using ES6 iterable
m.keys();

// Using ES6 function
function Baz() { }
Baz.name;

// Using ES6 generator
function* gen() {
    let i = 0;
    while (i < 10) {
        yield i;
        i++;
    }
}

function* gen2() {
    let i = 0;
    while (i < 10) {
        yield i;
        i++;
    }
}

// Using ES6 math
Math.sign(1);

// Using ES6 object
var o = {
    a: 2,
    [Symbol.hasInstance](value: any) {
        return false;
    }
};
o.hasOwnProperty(Symbol.hasInstance);

// Using ES6 promise
async function out() {
    return new Promise(function (resolve, reject) {});
}

declare var console: any;
out().then(() => {
    console.log("Yea!");
});

// Using Es6 proxy
var t = {}
var p = new Proxy(t, {});

// Using ES6 reflect
Reflect.isExtensible({});

// Using Es6 regexp
var reg = new RegExp("/s");
reg.flags;

// Using ES6 string
var str = "Hello world";
str.includes("hello", 0);

// Using ES6 symbol
var s = Symbol();

// Using ES6 wellknown-symbol
const o1 = {
    [Symbol.hasInstance](value: any) {
        return false;
    }
}

//// [modularizeLibrary_NoErrorDuplicateLibOptions1.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Using Es6 array
function f(x, y, z) {
    return Array.from(arguments);
}
f(1, 2, 3); // no error
// Using ES6 collection
var m = new Map();
m.clear();
// Using ES6 iterable
m.keys();
// Using ES6 function
function Baz() { }
Baz.name;
// Using ES6 generator
function* gen() {
    let i = 0;
    while (i < 10) {
        yield i;
        i++;
    }
}
function* gen2() {
    let i = 0;
    while (i < 10) {
        yield i;
        i++;
    }
}
// Using ES6 math
Math.sign(1);
// Using ES6 object
var o = {
    a: 2,
    [Symbol.hasInstance](value) {
        return false;
    }
};
o.hasOwnProperty(Symbol.hasInstance);
// Using ES6 promise
function out() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) { });
    });
}
out().then(() => {
    console.log("Yea!");
});
// Using Es6 proxy
var t = {};
var p = new Proxy(t, {});
// Using ES6 reflect
Reflect.isExtensible({});
// Using Es6 regexp
var reg = new RegExp("/s");
reg.flags;
// Using ES6 string
var str = "Hello world";
str.includes("hello", 0);
// Using ES6 symbol
var s = Symbol();
// Using ES6 wellknown-symbol
const o1 = {
    [Symbol.hasInstance](value) {
        return false;
    }
};
