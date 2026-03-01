//// [tests/cases/compiler/relatedViaDiscriminatedTypeNoError2.ts] ////

//// [relatedViaDiscriminatedTypeNoError2.ts]
type AObjOrBObj = { name: "A" } | { name: "B" };
type AOrBObj = { name: "A" | "B" };
type Generic<T extends AObjOrBObj> = T;

type T = Generic<AOrBObj>;

declare let x: AObjOrBObj;
declare let y: AOrBObj;
x = y;
y = x;


//// [relatedViaDiscriminatedTypeNoError2.js]
"use strict";
x = y;
y = x;
