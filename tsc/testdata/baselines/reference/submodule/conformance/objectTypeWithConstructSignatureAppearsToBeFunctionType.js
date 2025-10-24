//// [tests/cases/conformance/types/members/objectTypeWithConstructSignatureAppearsToBeFunctionType.ts] ////

//// [objectTypeWithConstructSignatureAppearsToBeFunctionType.ts]
// no errors expected below 

interface I {
    new(): number;
}

var i: I;
var r2: number = i();
var r2b: number = new i();
var r2c: (x: any, y?: any) => any = i.apply;

var b: {
    new(): number;
}

var r4: number = b();
var r4b: number = new b();
var r4c: (x: any, y?: any) => any = b.apply;

//// [objectTypeWithConstructSignatureAppearsToBeFunctionType.js]
// no errors expected below 
var i;
var r2 = i();
var r2b = new i();
var r2c = i.apply;
var b;
var r4 = b();
var r4b = new b();
var r4c = b.apply;
