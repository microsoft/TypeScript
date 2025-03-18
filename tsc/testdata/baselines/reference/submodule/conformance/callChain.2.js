//// [tests/cases/conformance/expressions/optionalChaining/callChain/callChain.2.ts] ////

//// [callChain.2.ts]
declare const o1: undefined | (() => number);
o1?.();

declare const o2: undefined | { b: () => number };
o2?.b();

declare const o3: { b: (() => { c: string }) | undefined };
o3.b?.().c;


//// [callChain.2.js]
o1?.();
o2?.b();
o3.b?.().c;
