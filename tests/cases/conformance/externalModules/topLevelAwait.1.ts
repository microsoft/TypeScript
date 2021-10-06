// @target: es2015,es2017
// @module: es2022,esnext,system
// @experimentalDecorators: true
// @noEmitHelpers: true
// @filename: index.ts
export const x = 1;
await x;

// reparse element access as await
await [x];
await [x, x];

// reparse call as await
declare function f(): number;
await (x);
await (f(), x);
await <number>(x);
await <number>(f(), x);

// reparse tagged template as await
await ``;
await <string> ``;

// member names should be ok
class C1 {
    await() {}
}
class C2 {
    get await() { return 1; }
    set await(value) { }
}
class C3 {
    await = 1;
}
({
    await() {}
});
({
    get await() { return 1 },
    set await(value) { }
});
({
    await: 1
});

// property access name should be ok
C1.prototype.await;

// await in decorators
declare const dec: any;
@(await dec)
class C {
}

// await allowed in aliased import
import { await as _await } from "./other";

// newlines
// await in throw
throw await
    1;

// await in var
let y = await
    1;

// await in expression statement;
await
    1;

// @filename: other.ts
const _await = 1;

// await allowed in aliased export
export { _await as await };

// for-await-of
const arr = [Promise.resolve()];

for await (const item of arr) {
  item;
}
