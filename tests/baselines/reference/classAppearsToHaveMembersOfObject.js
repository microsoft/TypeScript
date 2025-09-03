//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classAppearsToHaveMembersOfObject.ts] ////

//// [classAppearsToHaveMembersOfObject.ts]
class C { foo: string; }

var c: C;
var r = c.toString();
var r2 = c.hasOwnProperty('');
var o: Object = c;
var o2: {} = c;


//// [classAppearsToHaveMembersOfObject.js]
class C {
    foo;
}
var c;
var r = c.toString();
var r2 = c.hasOwnProperty('');
var o = c;
var o2 = c;
