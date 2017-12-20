function test1(x: number | string) {
    if (x instanceof Object) {
        x;
    }
}

function test2(x: (number | string) | number) {
    if (x instanceof Object) {
        x;
    }
}
