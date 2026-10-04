//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithEnumIndexer.ts] ////

//// [assignmentCompatWithEnumIndexer.ts]
enum E {
    A
}

let foo: Record<E, any> = {}


//// [assignmentCompatWithEnumIndexer.js]
"use strict";
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
let foo = {};
