// @strict: true
// @noEmit: true

// value_def is never inside the if. With a && condition, main and
// Strada leak the loop analysis's incomplete never placeholder
// (silentNever), so the property access is silently allowed and only
// the assignment errors. With `while (x)` they report the access.
function f(x: boolean, y: boolean) {
    let value_def: { last_ref: boolean } | null = null;
    if (value_def) {
        while (x && y);
        value_def.last_ref = false;
    }
}

function g(x: boolean) {
    let value_def: { last_ref: boolean } | null = null;
    if (value_def) {
        while (x);
        value_def.last_ref = false;
    }
}
