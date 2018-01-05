// @noUnusedLocals: true
// @noUnusedParameters: true

function f(x = 0) {
    x = 1;
    x++;
    x /= 2;

    let y = 0;
    // This is a write access to y, but not a write-*only* access.
    f(y++);
}
