/// <reference path='fourslash.ts'/>

// @Filename: keyof.ts
//// function doSomethingWithKeys<T>(...keys: (keyof T)[]) { }
////
//// const /*1*/utilityFunctions = {
////   doSomethingWithKeys
//// };

// @Filename: typeof.ts
//// class Foo { static a: number; }
//// function doSomethingWithTypes(...statics: (typeof Foo)[]) {}
////
//// const /*2*/utilityFunctions = {
////   doSomethingWithTypes
//// };

verify.quickInfos({
    1: "const utilityFunctions: {\n    doSomethingWithKeys: <T>(...keys: (keyof T)[]) => void;\n}",
    2: "const utilityFunctions: {\n    doSomethingWithTypes: (...statics: (typeof Foo)[]) => void;\n}"
});
