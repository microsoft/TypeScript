//// [noUnusedLocals_writeOnly.ts]
function f(x = 0, b = false) {
    // None of these statements read from 'x', so it will be marked unused.
    x = 1;
    x++;
    x /= 2;
    ([x] = [1]);
    ({ x } = { x: 1 });
    ({ x: x } = { x: 1 });
    ({ a: [{ b: x }] } = { a: [{ b: 1 }] });
    ({ x = 2 } = { x: b ? 1 : undefined });
    let used = 1;
    ({ x = used } = { x: b ? 1 : undefined });

    let y = 0;
    // This is a write access to y, but not a write-*only* access.
    f(y++);

    let z = 0;
    f(z = 1); // This effectively doesn't use `z`, values just pass through it.
}
function f2(_: ReadonlyArray<number>): void {}


//// [noUnusedLocals_writeOnly.js]
"use strict";
function f(x, b) {
    var _a, _b;
    if (x === void 0) { x = 0; }
    if (b === void 0) { b = false; }
    // None of these statements read from 'x', so it will be marked unused.
    x = 1;
    x++;
    x /= 2;
    (x = [1][0]);
    (x = { x: 1 }.x);
    (x = { x: 1 }.x);
    (x = { a: [{ b: 1 }] }.a[0].b);
    (_a = { x: b ? 1 : undefined }.x, x = _a === void 0 ? 2 : _a);
    var used = 1;
    (_b = { x: b ? 1 : undefined }.x, x = _b === void 0 ? used : _b);
    var y = 0;
    // This is a write access to y, but not a write-*only* access.
    f(y++);
    var z = 0;
    f(z = 1); // This effectively doesn't use `z`, values just pass through it.
}
function f2(_) { }
