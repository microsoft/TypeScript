//// [tests/cases/compiler/unusedLocalsStartingWithUnderscore.ts] ////

//// [unusedLocalsStartingWithUnderscore.ts]
// Variables
const unusedVar = 1; // error
const _unusedVar = 2; // ok

let unusedLet = 3; // error  
let _unusedLet = 4; // ok

var unusedVar2 = 5; // error
var _unusedVar2 = 6; // ok

const { a1, _b1 } = { a1: 1, _b1: 2 }; // error on a1
const { _a2, _b2 } = { _a2: 1, _b2: 2 }; // ok

// Functions
function unusedFunc() { } // error
function _unusedFunc() { } // ok

const unusedArrow = () => { }; // error
const _unusedArrow = () => { }; // ok

// Classes
class UnusedClass { } // error
class _UnusedClass { } // ok

// Interfaces
interface UnusedInterface { } // error
interface _UnusedInterface { } // ok

// Type aliases
type UnusedType = string; // error
type _UnusedType = string; // ok

// Enums
enum UnusedEnum { A } // error
enum _UnusedEnum { A } // ok

// Declarations in for loops
for (const _x of []) { } // ok
for (const x of []) { } // error
for (const _x in []) { } // ok
for (const x in []) { } // error

// Namespaces
namespace UnusedNamespace { // error
    export const x = 1;
}
namespace _UnusedNamespace { // ok
    export const x = 1;
}

// Destructuring
const { a: unusedA } = { a: 1 }; // error
const { b: _unusedB } = { b: 2 }; // ok
const [unusedC] = [3]; // error
const [_unusedD] = [4]; // ok

//
// The following declarations may _not_ use an underscore to bypass @noUnusedLocals
//

class TestClass {
    private unusedMember = 1; // error
    private _unusedMember = 2; // still error

    private unusedMethod() { } // error
    private _unusedMethod() { } // still error
}

enum TestEnum {
    UnusedMember = 1, // error
    _UnusedMember = 2, // still error
}

interface TestInterface {
    unusedProp: number; // error
    _unusedProp: number; // still error
}

const obj = {
    unusedProp: 1, // error
    _unusedProp: 2, // still error
};

export { };

//// [unusedLocalsStartingWithUnderscore.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Variables
var unusedVar = 1; // error
var _unusedVar = 2; // ok
var unusedLet = 3; // error  
var _unusedLet = 4; // ok
var unusedVar2 = 5; // error
var _unusedVar2 = 6; // ok
var _a = { a1: 1, _b1: 2 }, a1 = _a.a1, _b1 = _a._b1; // error on a1
var _b = { _a2: 1, _b2: 2 }, _a2 = _b._a2, _b2 = _b._b2; // ok
// Functions
function unusedFunc() { } // error
function _unusedFunc() { } // ok
var unusedArrow = function () { }; // error
var _unusedArrow = function () { }; // ok
// Classes
var UnusedClass = /** @class */ (function () {
    function UnusedClass() {
    }
    return UnusedClass;
}()); // error
var _UnusedClass = /** @class */ (function () {
    function _UnusedClass() {
    }
    return _UnusedClass;
}()); // ok
// Enums
var UnusedEnum;
(function (UnusedEnum) {
    UnusedEnum[UnusedEnum["A"] = 0] = "A";
})(UnusedEnum || (UnusedEnum = {})); // error
var _UnusedEnum;
(function (_UnusedEnum) {
    _UnusedEnum[_UnusedEnum["A"] = 0] = "A";
})(_UnusedEnum || (_UnusedEnum = {})); // ok
// Declarations in for loops
for (var _i = 0, _c = []; _i < _c.length; _i++) {
    var _x = _c[_i];
} // ok
for (var _d = 0, _e = []; _d < _e.length; _d++) {
    var x = _e[_d];
} // error
for (var _x in []) { } // ok
for (var x in []) { } // error
// Namespaces
var UnusedNamespace;
(function (UnusedNamespace) {
    UnusedNamespace.x = 1;
})(UnusedNamespace || (UnusedNamespace = {}));
var _UnusedNamespace;
(function (_UnusedNamespace) {
    _UnusedNamespace.x = 1;
})(_UnusedNamespace || (_UnusedNamespace = {}));
// Destructuring
var unusedA = { a: 1 }.a; // error
var _unusedB = { b: 2 }.b; // ok
var unusedC = [3][0]; // error
var _unusedD = [4][0]; // ok
//
// The following declarations may _not_ use an underscore to bypass @noUnusedLocals
//
var TestClass = /** @class */ (function () {
    function TestClass() {
        this.unusedMember = 1; // error
        this._unusedMember = 2; // still error
    }
    TestClass.prototype.unusedMethod = function () { }; // error
    TestClass.prototype._unusedMethod = function () { }; // still error
    return TestClass;
}());
var TestEnum;
(function (TestEnum) {
    TestEnum[TestEnum["UnusedMember"] = 1] = "UnusedMember";
    TestEnum[TestEnum["_UnusedMember"] = 2] = "_UnusedMember";
})(TestEnum || (TestEnum = {}));
var obj = {
    unusedProp: 1, // error
    _unusedProp: 2, // still error
};
