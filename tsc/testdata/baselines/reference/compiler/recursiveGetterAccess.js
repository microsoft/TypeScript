//// [tests/cases/compiler/recursiveGetterAccess.ts] ////

//// [recursiveGetterAccess.ts]
class MyClass {
get testProp() { return this.testProp; }
}
 


//// [recursiveGetterAccess.js]
"use strict";
class MyClass {
    get testProp() { return this.testProp; }
}
