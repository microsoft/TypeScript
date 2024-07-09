//// [tests/cases/compiler/typeArgumentsShouldDisallowNonGenericOverloads.ts] ////

//// [typeArgumentsShouldDisallowNonGenericOverloads.ts]
function foo(a: string): string;
function foo<T>(a: T): number;
function foo(a: any): any {
    return "hi";
}

var x: number = foo<string>("hi"); // return type should be 'number'
var y: string = foo("hi"); // return type should be 'string'

var w: string = foo<string>("hi"); // should error
var z: number = foo("hi"); // should error

//// [typeArgumentsShouldDisallowNonGenericOverloads.js]
function foo(a) {
    return "hi";
}
var x = foo("hi"); // return type should be 'number'
var y = foo("hi"); // return type should be 'string'
var w = foo("hi"); // should error
var z = foo("hi"); // should error
