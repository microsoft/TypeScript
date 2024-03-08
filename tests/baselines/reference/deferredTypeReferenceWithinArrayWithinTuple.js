//// [tests/cases/compiler/deferredTypeReferenceWithinArrayWithinTuple.ts] ////

//// [deferredTypeReferenceWithinArrayWithinTuple.ts]
type TypeStructure =
  | ["or", TypeStructure[]] // problem is only here, when using array
  | ["string"]
  | ["number"] 
  | ["list", TypeStructure] // with just this it is ok

//// [deferredTypeReferenceWithinArrayWithinTuple.js]
