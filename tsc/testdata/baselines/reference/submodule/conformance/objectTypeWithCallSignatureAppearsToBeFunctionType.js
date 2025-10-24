//// [tests/cases/conformance/types/members/objectTypeWithCallSignatureAppearsToBeFunctionType.ts] ////

//// [objectTypeWithCallSignatureAppearsToBeFunctionType.ts]
// objects with call signatures should be permitted where function types are expected
// no errors expected below

interface I {
    (): void;
}

var i: I;
var r2: void = i();
var r2b: (x: any, y?: any) => any = i.apply;

var b: {
    (): void;
}

var r4: void = b();
var rb4: (x: any, y?: any) => any = b.apply;

//// [objectTypeWithCallSignatureAppearsToBeFunctionType.js]
// objects with call signatures should be permitted where function types are expected
// no errors expected below
var i;
var r2 = i();
var r2b = i.apply;
var b;
var r4 = b();
var rb4 = b.apply;
