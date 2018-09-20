//// [tests/cases/compiler/mergedInterfaceFromMultipleFiles1.ts] ////

//// [mergedInterfaceFromMultipleFiles1_0.ts]
interface I { foo(): string; }

interface C extends I {
	a(): number;
}

//// [mergedInterfaceFromMultipleFiles1_1.ts]
/// <reference path='mergedInterfaceFromMultipleFiles1_0.ts'/>

interface D { bar(): number; }

interface C extends D {
	b(): Date;
}

var c:C;
var a: string = c.foo();
var b: number = c.bar();
var d: number = c.a();
var e: Date = c.b();

//// [mergedInterfaceFromMultipleFiles1_0.js]
//// [mergedInterfaceFromMultipleFiles1_1.js]
/// <reference path='mergedInterfaceFromMultipleFiles1_0.ts'/>
var c;
var a = c.foo();
var b = c.bar();
var d = c.a();
var e = c.b();
