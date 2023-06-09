//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithEnumIndexer.ts] ////

//// [assignmentCompatWithEnumIndexer.ts]
enum E {
    A
}

let foo: Record<E, any> = {}


//// [assignmentCompatWithEnumIndexer.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var foo = {};
