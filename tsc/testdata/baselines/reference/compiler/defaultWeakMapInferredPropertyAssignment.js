//// [tests/cases/compiler/defaultWeakMapInferredPropertyAssignment.ts] ////

//// [defaultWeakMapInferredPropertyAssignment.ts]
const frameInfo = { frames: new WeakMap() };
const target: { frames: WeakMap<{ id: string }, number> } = frameInfo;


//// [defaultWeakMapInferredPropertyAssignment.js]
"use strict";
const frameInfo = { frames: new WeakMap() };
const target = frameInfo;
