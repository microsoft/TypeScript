// @noUnusedLocals:true

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