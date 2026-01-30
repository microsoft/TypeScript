//// [tests/cases/compiler/selfReferencingSpreadInLoop.ts] ////

//// [selfReferencingSpreadInLoop.ts]
let additional = [];
for (const subcomponent of [1, 2, 3]) {
    additional = [...additional, subcomponent];
}


//// [selfReferencingSpreadInLoop.js]
let additional = [];
for (const subcomponent of [1, 2, 3]) {
    additional = [...additional, subcomponent];
}
