//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_propertyValueConformance1.ts] ////

//// [typeSatisfaction_propertyValueConformance1.ts]
type Facts = { [key: string]: boolean };
declare function checkTruths(x: Facts): void;
declare function checkM(x: { m: boolean }): void;
const x = {
    m: true
};

// Should be OK
checkTruths(x);
// Should be OK
checkM(x);
// Should fail under --noPropertyAccessFromIndexSignature
console.log(x.z);
const m: boolean = x.m;

// Should be 'm'
type M = keyof typeof x;

// Should be able to detect a failure here
const x2 = {
    m: true,
    s: "false"
} satisfies Facts;


//// [typeSatisfaction_propertyValueConformance1.js]
var x = {
    m: true
};
// Should be OK
checkTruths(x);
// Should be OK
checkM(x);
// Should fail under --noPropertyAccessFromIndexSignature
console.log(x.z);
var m = x.m;
// Should be able to detect a failure here
var x2 = {
    m: true,
    s: "false"
};
