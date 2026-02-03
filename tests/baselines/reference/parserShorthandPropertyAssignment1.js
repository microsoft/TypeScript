//// [tests/cases/conformance/parser/ecmascript6/ShorthandPropertyAssignment/parserShorthandPropertyAssignment1.ts] ////

//// [parserShorthandPropertyAssignment1.ts]
function foo(obj: { name?: string; id: number }) { }
var name:any, id: any;
foo({ name?, id? });

//// [parserShorthandPropertyAssignment1.js]
function foo(obj) { }
var name, id;
foo({ name: name, id: id });
