//// [typeofUndefined.ts]
var x: typeof undefined;
var x: any; // shouldn't be an error since type is the same as the first declaration

//// [typeofUndefined.js]
var x;
var x; // shouldn't be an error since type is the same as the first declaration


//// [typeofUndefined.d.ts]
declare var x: typeof undefined;
declare var x: any;
