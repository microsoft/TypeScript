//// [tests/cases/compiler/blockScopedBindingsInDownlevelGenerator.ts] ////

//// [blockScopedBindingsInDownlevelGenerator.ts]
function* a() {
  for (const i of [1,2,3]) {
    (() => i)()
    yield i
  }
}

//// [blockScopedBindingsInDownlevelGenerator.js]
"use strict";
function* a() {
    for (const i of [1, 2, 3]) {
        (() => i)();
        yield i;
    }
}
