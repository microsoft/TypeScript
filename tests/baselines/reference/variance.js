//// [tests/cases/conformance/types/conditional/variance.ts] ////

//// [variance.ts]
// Test cases for parameter variances affected by conditional types.

// Repro from #30047

interface Foo<T> {
  prop: T extends unknown ? true : false;
}

const foo = { prop: true } as const;
const x: Foo<1> = foo;
const y: Foo<number> = foo;
const z: Foo<number> = x;


// Repro from #30118

class Bar<T extends string> {
  private static instance: Bar<string>[] = [];

  cast(_name: ([T] extends [string] ? string : string)) { }
  
  pushThis() {
    Bar.instance.push(this);
  }
}


//// [variance.js]
"use strict";
// Test cases for parameter variances affected by conditional types.
var foo = { prop: true };
var x = foo;
var y = foo;
var z = x;
// Repro from #30118
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.cast = function (_name) { };
    Bar.prototype.pushThis = function () {
        Bar.instance.push(this);
    };
    Bar.instance = [];
    return Bar;
}());
