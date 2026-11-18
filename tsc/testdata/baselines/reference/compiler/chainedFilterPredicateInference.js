//// [tests/cases/compiler/chainedFilterPredicateInference.ts] ////

//// [chainedFilterPredicateInference.ts]
declare const items: { id: number }[];
declare const registry: { [id: number]: { [frame: number]: unknown } };

items
    .filter(item => true)
    .filter(item => !registry[item.id])
    .forEach(item => item.id);


//// [chainedFilterPredicateInference.js]
"use strict";
items
    .filter(item => true)
    .filter(item => !registry[item.id])
    .forEach(item => item.id);
