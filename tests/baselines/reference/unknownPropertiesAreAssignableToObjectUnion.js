//// [tests/cases/compiler/unknownPropertiesAreAssignableToObjectUnion.ts] ////

//// [unknownPropertiesAreAssignableToObjectUnion.ts]
const x: Object | string = { x: 0 };
const y: Object | undefined = { x: 0 };


//// [unknownPropertiesAreAssignableToObjectUnion.js]
const x = { x: 0 };
const y = { x: 0 };
