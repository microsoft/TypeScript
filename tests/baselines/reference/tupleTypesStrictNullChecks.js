//// [tupleTypesStrictNullChecks.ts]
var et: [] = [];
var et0 = et[0];  // never
var et0: never;

et = [];    // Ok


//// [tupleTypesStrictNullChecks.js]
var et = [];
var et0 = et[0]; // never
var et0;
et = []; // Ok
