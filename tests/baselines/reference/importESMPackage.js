//// [tests/cases/conformance/module/importESMPackage.ts] ////

//// [package.json]
{
    "name": "dep",
    "version": "1.0.0",
    "type": "module",
    "main": "index.js"
}

//// [index.d.ts]
export declare const foo: string;

//// [index.ts]
import dep from "dep"; // Error
dep.foo;


//// [index.js]
import dep from "dep"; // Error
dep.foo;
