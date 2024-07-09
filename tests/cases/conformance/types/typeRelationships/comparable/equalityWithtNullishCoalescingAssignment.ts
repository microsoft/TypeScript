// @strict: true, false

function f1(a?: boolean): void {
    a ??= true;

    if (a === false) {
        console.log(a);
    }
}
f1(false);

function f2() {
    let x: 0 | 1 | 2 | 3 = 0 as any;
    x ??= 1;
    if (x === 0) {
        console.log(x);
    }
}
