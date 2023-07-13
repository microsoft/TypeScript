//// [tests/cases/conformance/types/members/objectTypeWithCallSignatureHidingMembersOfFunction.ts] ////

//// [objectTypeWithCallSignatureHidingMembersOfFunction.ts]
// object types with call signatures can override members of Function
// no errors expected below 

interface I {
    (): void;
    apply(a: any, b?: any): void;
    call(thisArg: number, ...argArray: number[]): any;
}

var i: I;
var r1: (a: any, b?: any) => void = i.apply;
var r1b: (thisArg: number, ...argArray: number[]) => void = i.call;
var r1c = i.arguments;

var x: {
    (): void;
    apply(a: any, b?: any): void;
    call(thisArg: number, ...argArray: number[]): any;
}

var r2: (a: any, b?: any) => void = x.apply;
var r2b: (thisArg: number, ...argArray: number[]) => void = x.call;
var r2c = x.arguments;


//// [objectTypeWithCallSignatureHidingMembersOfFunction.js]
// object types with call signatures can override members of Function
// no errors expected below 
var i;
var r1 = i.apply;
var r1b = i.call;
var r1c = i.arguments;
var x;
var r2 = x.apply;
var r2b = x.call;
var r2c = x.arguments;
