//// [tests/cases/compiler/invalidTripleSlashReference.ts] ////

//// [invalidTripleSlashReference.ts]
/// <reference path='filedoesnotexist.ts'/>
/// <reference path='otherdoesnotexist.d.ts'/>

// this test doesn't actually give the errors you want due to the way the compiler reports errors
var x = 1;

//// [filedoesnotexist.js]
//// [invalidTripleSlashReference.js]
var x = 1;
