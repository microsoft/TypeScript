//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatBetweenTupleAndArray.ts] ////

//// [assignmentCompatBetweenTupleAndArray.ts]
declare var numStrTuple: [number, string];
declare var numNumTuple: [number, number];
declare var numEmptyObjTuple: [number, {}];
declare var emptyObjTuple: [{}];

declare var numArray: number[];
declare var emptyObjArray: {}[];

// no error
numArray = numNumTuple;
emptyObjArray = emptyObjTuple;
emptyObjArray = numStrTuple;
emptyObjArray = numNumTuple;
emptyObjArray = numEmptyObjTuple;

// error
numArray = numStrTuple;
emptyObjTuple = emptyObjArray;


//// [assignmentCompatBetweenTupleAndArray.js]
// no error
numArray = numNumTuple;
emptyObjArray = emptyObjTuple;
emptyObjArray = numStrTuple;
emptyObjArray = numNumTuple;
emptyObjArray = numEmptyObjTuple;
// error
numArray = numStrTuple;
emptyObjTuple = emptyObjArray;
