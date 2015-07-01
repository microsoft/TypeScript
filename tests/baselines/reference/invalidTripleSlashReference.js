//// [invalidTripleSlashReference.ts]
/// <reference path='filedoesnotexist.ts'/>
/// <reference path='otherdoesnotexist.d.ts'/>

// this test doesn't actually give the errors you want due to the way the compiler reports errors
var x = 1;

//// [invalidTripleSlashReference.js]
/// <reference path='filedoesnotexist.ts'/>
/// <reference path='otherdoesnotexist.d.ts'/>
// this test doesn't actually give the errors you want due to the way the compiler reports errors
var x = 1;
