===ORIGINAL===

function foo(a: number,b: string,c = true) {
    return 1;
}
===MODIFIED===

function foo(a: number,b: string) {
    return 1;
}