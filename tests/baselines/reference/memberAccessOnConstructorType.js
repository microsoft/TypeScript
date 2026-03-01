//// [tests/cases/compiler/memberAccessOnConstructorType.ts] ////

//// [memberAccessOnConstructorType.ts]
var f: new () => void;
f.arguments == 0;

//// [memberAccessOnConstructorType.js]
"use strict";
var f;
f.arguments == 0;
