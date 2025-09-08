//// [tests/cases/conformance/expressions/optionalChaining/propertyAccessChain/propertyAccessChain.2.ts] ////

//// [propertyAccessChain.2.ts]
declare const o1: undefined | { b: string };
o1?.b;

declare const o2: undefined | { b: { c: string } };
o2?.b.c;

declare const o3: { b: undefined | { c: string } };
o3.b?.c;


//// [propertyAccessChain.2.js]
o1?.b;
o2?.b.c;
o3.b?.c;
