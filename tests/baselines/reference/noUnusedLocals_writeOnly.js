//// [noUnusedLocals_writeOnly.ts]
function f(x = 0) {
    x = 1;
    x++;
    x /= 2;

    let y = 0;
    // This is a write access to y, but not a write-*only* access.
    f(y++);

    let z = 0;
    f(z = 1); // This effectively doesn't use `z`, values just pass through it.
}


//// [noUnusedLocals_writeOnly.js]
function f(x) {
    if (x === void 0) { x = 0; }
    x = 1;
    x++;
    x /= 2;
    var y = 0;
    // This is a write access to y, but not a write-*only* access.
    f(y++);
    var z = 0;
    f(z = 1); // This effectively doesn't use `z`, values just pass through it.
}
