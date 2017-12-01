//// [functionReturn.ts]
function f0(): void { }
function f1() {
    var n: any = f0();
}
function f2(): any { }
function f3(): string { return; }
function f4(): string {
    return '';
    return;
}
function f5(): string {
    return '';
    return undefined;
}

//// [functionReturn.js]
function f0() { }
function f1() {
    var n = f0();
}
function f2() { }
function f3() { return; }
function f4() {
    return '';
    return;
}
function f5() {
    return '';
    return undefined;
}
