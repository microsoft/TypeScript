//// [tests/cases/compiler/es6ClassTest5.ts] ////

//// [es6ClassTest5.ts]
class C1T5 {
    foo: (i: number, s: string) => number = 
	   	(i) => {
	        return i;
	    }
}
namespace C2T5 {}

class  bigClass {
     public break = 1;
}


//// [es6ClassTest5.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class C1T5 {
    constructor() {
        this.foo = __setFunctionName((i) => {
            return i;
        }, "foo");
    }
}
class bigClass {
    constructor() {
        this.break = 1;
    }
}
