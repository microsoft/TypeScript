//// [tests/cases/compiler/recursiveGetterAccess.ts] ////

//// [recursiveGetterAccess.ts]
class MyClass {
get testProp() { return this.testProp; }
}
 


//// [recursiveGetterAccess.js]
class MyClass {
    get testProp() { return this.testProp; }
}
