// @noUnusedLocals: true
// @noUnusedParameters: true

function f(x = 0) {
    x = 1;
    x++;
    x /= 2;
    ([x] = [1]);
    ({ x } = { x: 1 });
    ({ x: x } = { x: 1 });

    let y = 0;
    // This is a write access to y, but not a write-*only* access.
    f(y++);
}
function f2(_: ReadonlyArray<number>): void {}
