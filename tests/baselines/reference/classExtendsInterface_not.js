//// [tests/cases/compiler/classExtendsInterface_not.ts] ////

//// [classExtendsInterface_not.ts]
class C extends "".bogus {}


//// [classExtendsInterface_not.js]
"use strict";
class C extends "".bogus {
}
