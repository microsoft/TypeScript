//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesOnOverloads_ES5.ts] ////

//// [computedPropertyNamesOnOverloads_ES5.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v: string);
    [methodName]();
    [methodName](v?: string) { }
}

//// [computedPropertyNamesOnOverloads_ES5.js]
"use strict";
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v) { }
}
