// @Filename: mergedInterfaceFromMultipleFiles1_0.ts

interface I { foo(): string; }

interface C extends I {
	a(): number;
}

// @Filename: mergedInterfaceFromMultipleFiles1_1.ts
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