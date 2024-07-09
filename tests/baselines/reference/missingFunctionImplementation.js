//// [tests/cases/compiler/missingFunctionImplementation.ts] ////

//// [missingFunctionImplementation.ts]
export class C1 {
  m(): void;
}

// merged with a namespace
export class C2 {
  m(): void;
}
export namespace C2 { }


// merged with a namespace, multiple overloads
class C3 {
  m(a, b);
  m(a);
}
namespace C3 { }

// static methods, multiple overloads
class C4 {
  static m(a): void;
}

// static methods, multiple overloads
class C5 {
  static m(a): void;
  static m(): void;
}

// merged with namespace, static methods
class C6 {
  static m(): void;
}
namespace C6 {
}

// merged with namespace, static methods, multiple overloads
class C7 {
  static m(a): void;
  static m(): void;
}
namespace C7 {
}

// merged with namespace, static methods, duplicate declarations
class C8 {
  static m(a): void;
  static m(a, b): void;
}
namespace C8 {
  export function m(a?, b?): void { }
}

// merged with namespace, static methods, duplicate declarations
class C9 {
  static m(a): void { }
}
namespace C9 {
  export function m(a): void;
}

// merged namespaces
namespace N10 {
  export function m(a): void;
}
namespace N10 {
  export function m(a): void { }
}

// merged namespaces, duplicate defintions
namespace N12 {
  export function m(a): void;
  export function m(): void;
  export function m(a?): void { }
}
namespace N12 {
  export function m(a): void { }
}


//// [missingFunctionImplementation.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C2 = exports.C1 = void 0;
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
exports.C1 = C1;
// merged with a namespace
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
exports.C2 = C2;
// merged with a namespace, multiple overloads
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
// static methods, multiple overloads
var C4 = /** @class */ (function () {
    function C4() {
    }
    return C4;
}());
// static methods, multiple overloads
var C5 = /** @class */ (function () {
    function C5() {
    }
    return C5;
}());
// merged with namespace, static methods
var C6 = /** @class */ (function () {
    function C6() {
    }
    return C6;
}());
// merged with namespace, static methods, multiple overloads
var C7 = /** @class */ (function () {
    function C7() {
    }
    return C7;
}());
// merged with namespace, static methods, duplicate declarations
var C8 = /** @class */ (function () {
    function C8() {
    }
    return C8;
}());
(function (C8) {
    function m(a, b) { }
    C8.m = m;
})(C8 || (C8 = {}));
// merged with namespace, static methods, duplicate declarations
var C9 = /** @class */ (function () {
    function C9() {
    }
    C9.m = function (a) { };
    return C9;
}());
(function (C9) {
})(C9 || (C9 = {}));
// merged namespaces
var N10;
(function (N10) {
})(N10 || (N10 = {}));
(function (N10) {
    function m(a) { }
    N10.m = m;
})(N10 || (N10 = {}));
// merged namespaces, duplicate defintions
var N12;
(function (N12) {
    function m(a) { }
    N12.m = m;
})(N12 || (N12 = {}));
(function (N12) {
    function m(a) { }
    N12.m = m;
})(N12 || (N12 = {}));
