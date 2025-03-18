//// [tests/cases/conformance/expressions/optionalChaining/elementAccessChain/elementAccessChain.2.ts] ////

//// [elementAccessChain.2.ts]
declare const o1: undefined | { b: string };
o1?.["b"];

declare const o2: undefined | { b: { c: string } };
o2?.["b"].c;
o2?.b["c"];

declare const o3: { b: undefined | { c: string } };
o3["b"]?.c;
o3.b?.["c"];


//// [elementAccessChain.2.js]
o1?.["b"];
o2?.["b"].c;
o2?.b["c"];
o3["b"]?.c;
o3.b?.["c"];
