//// [tests/cases/compiler/reverseMappedThisLeak.ts] ////

//// [reverseMappedThisLeak.ts]
declare function test<T extends Record<string, unknown>>(obj:{
  [K in keyof T]: () => T[K];
}): T;

const obj = test({
  a() {
    return 1;
  },
  b() {
    return this.a();
    // Expected: number
    // Actual: T[string] (bug)
  }
});

obj.b(); // should be `number`, but currently inferred as `T[string]`

//// [reverseMappedThisLeak.js]
"use strict";
var obj = test({
    a: function () {
        return 1;
    },
    b: function () {
        return this.a();
        // Expected: number
        // Actual: T[string] (bug)
    }
});
obj.b(); // should be `number`, but currently inferred as `T[string]`
