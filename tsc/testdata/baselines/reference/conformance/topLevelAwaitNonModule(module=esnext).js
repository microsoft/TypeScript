//// [tests/cases/conformance/externalModules/topLevelAwaitNonModule.ts] ////

//// [topLevelAwaitNonModule.ts]
await x;

const arr = [Promise.resolve()];

for await (const item of arr) {
  item;
}


//// [topLevelAwaitNonModule.js]
"use strict";
await x;
const arr = [Promise.resolve()];
for await (const item of arr) {
    item;
}
