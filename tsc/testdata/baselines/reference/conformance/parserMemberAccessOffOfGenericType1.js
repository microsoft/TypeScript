//// [tests/cases/conformance/parser/ecmascript5/Generics/parserMemberAccessOffOfGenericType1.ts] ////

//// [parserMemberAccessOffOfGenericType1.ts]
var v = List<number>.makeChild();

//// [parserMemberAccessOffOfGenericType1.js]
"use strict";
var v = List.makeChild();
