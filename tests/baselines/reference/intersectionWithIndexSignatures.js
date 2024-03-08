//// [tests/cases/conformance/types/intersection/intersectionWithIndexSignatures.ts] ////

//// [intersectionWithIndexSignatures.ts]
type A = { a: string };
type B = { b: string };

declare let sa1: { x: A & B };
declare let sa2: { x: A } & { x: B };
declare let ta1: { [key: string]: A & B };
declare let ta2: { [key: string]: A } & { [key: string]: B };

ta1 = sa1;
ta1 = sa2;
ta2 = sa1;
ta2 = sa2;

declare let sb1: { x: A } & { y: B };
declare let tb1: { [key: string]: A };

tb1 = sb1;  // Error

// Repro from #32484

type constr<Source, Tgt> = { [K in keyof Source]: string } & Pick<Tgt, Exclude<keyof Tgt, keyof Source>>;

type s = constr<{}, { [key: string]: { a: string } }>;

declare const q: s;
q["asd"].a.substr(1);
q["asd"].b;  // Error

const d: { [key: string]: {a: string, b: string} } = q;  // Error

// Repro from #32484

declare let ss: { a: string } & { b: number };
declare let tt: { [key: string]: string };
tt = ss;  // Error


//// [intersectionWithIndexSignatures.js]
"use strict";
ta1 = sa1;
ta1 = sa2;
ta2 = sa1;
ta2 = sa2;
tb1 = sb1; // Error
q["asd"].a.substr(1);
q["asd"].b; // Error
var d = q; // Error
tt = ss; // Error
