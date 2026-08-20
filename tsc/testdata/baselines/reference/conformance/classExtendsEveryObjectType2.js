//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsEveryObjectType2.ts] ////

//// [classExtendsEveryObjectType2.ts]
class C2 extends { foo: string; } { } // error

class C6 extends []{ } // error

//// [classExtendsEveryObjectType2.js]
"use strict";
class C2 extends { foo: string, } {
} // error
class C6 extends [] {
} // error
