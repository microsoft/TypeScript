//// [tests/cases/compiler/library_StringSlice.ts] ////

//// [library_StringSlice.ts]
// String.prototype.slice can have zero, one, or two arguments
String.prototype.slice();
String.prototype.slice(0);
String.prototype.slice(0,1);


//// [library_StringSlice.js]
// String.prototype.slice can have zero, one, or two arguments
String.prototype.slice();
String.prototype.slice(0);
String.prototype.slice(0, 1);
