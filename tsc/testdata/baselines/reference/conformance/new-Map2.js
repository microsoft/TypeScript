//// [tests/cases/conformance/es6/mapConstruction/new-Map2.ts] ////

//// [new-Map2.ts]
const m1 = new Map([]);

const a2: any[] = [];
const m2 = new Map(a2);

const a3 = [];
const m3 = new Map(a3);


//// [new-Map2.js]
"use strict";
const m1 = new Map([]);
const a2 = [];
const m2 = new Map(a2);
const a3 = [];
const m3 = new Map(a3);
