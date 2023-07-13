//// [tests/cases/conformance/externalModules/topLevelAwaitNonModule.ts] ////

//// [topLevelAwaitNonModule.ts]
await x;

const arr = [Promise.resolve()];

for await (const item of arr) {
  item;
}


//// [topLevelAwaitNonModule.js]
await x;
const arr = [Promise.resolve()];
for await (const item of arr) {
    item;
}
