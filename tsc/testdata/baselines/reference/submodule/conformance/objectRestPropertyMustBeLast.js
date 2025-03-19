//// [tests/cases/conformance/types/rest/objectRestPropertyMustBeLast.ts] ////

//// [objectRestPropertyMustBeLast.ts]
var {...a, x } = { x: 1 };    // Error, rest must be last property
({...a, x } = { x: 1 });      // Error, rest must be last property

var {...a, x, ...b } = { x: 1 };    // Error, rest must be last property
({...a, x, ...b } = { x: 1 });      // Error, rest must be last property


//// [objectRestPropertyMustBeLast.js]
var { ...a, x } = { x: 1 }; // Error, rest must be last property
({ ...a, x } = { x: 1 }); // Error, rest must be last property
var { ...a, x, ...b } = { x: 1 }; // Error, rest must be last property
({ ...a, x, ...b } = { x: 1 }); // Error, rest must be last property
