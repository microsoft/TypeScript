//// [tests/cases/compiler/newMap.ts] ////

//// [newMap.ts]
new Map<string>();
new WeakMap<object>();


//// [newMap.js]
"use strict";
new Map();
new WeakMap();
