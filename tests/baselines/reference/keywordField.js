//// [tests/cases/compiler/keywordField.ts] ////

//// [keywordField.ts]
var obj:any = {};

obj.if = 1;

var a = { if: "test" }

var n = a.if

var q = a["if"];


//// [keywordField.js]
var obj = {};
obj.if = 1;
var a = { if: "test" };
var n = a.if;
var q = a["if"];
