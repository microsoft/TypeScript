//// [negatedTypesSimplifyInIntersections.ts]
type A = boolean & not true;   // false
type B = "w" & not string;     // never


//// [negatedTypesSimplifyInIntersections.js]
