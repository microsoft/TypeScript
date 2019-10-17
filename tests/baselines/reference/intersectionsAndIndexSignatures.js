//// [intersectionsAndIndexSignatures.ts]
declare let s1: { a: string } & { b: string };
declare let s2: { a: string } & { b: number };
declare let s3: { [K in never]: never } & { b: string };
declare let s4: { [K in never]: never } & { b: number };
declare let s5: { [key: number]: string } & { b: string };
declare let s6: { [key: number]: string } & { b: number };
declare let s7: { [key: string]: string } & { b: string };
declare let s8: { [key: string]: string } & { b: number };

declare let t1: { [key: string]: string };

t1 = s1;
t1 = s2;  // Error
t1 = s3;
t1 = s4;  // Error
t1 = s5;
t1 = s6;  // Error
t1 = s7;
t1 = s8;  // Error

// Repro from #32484

type constr<Source, Tgt> = { [K in keyof Source]: string } & Pick<Tgt, Exclude<keyof Tgt, keyof Source>>;

type s = constr<{}, { [key: string]: { a: string } }>;

declare const q: s;
q["asd"].a.substr(1);
q["asd"].b;  // Error

const d: { [key: string]: {a: string, b: string} } = q;  // Error


//// [intersectionsAndIndexSignatures.js]
"use strict";
t1 = s1;
t1 = s2; // Error
t1 = s3;
t1 = s4; // Error
t1 = s5;
t1 = s6; // Error
t1 = s7;
t1 = s8; // Error
q["asd"].a.substr(1);
q["asd"].b; // Error
var d = q; // Error
