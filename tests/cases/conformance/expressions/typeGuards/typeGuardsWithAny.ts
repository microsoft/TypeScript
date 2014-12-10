var x: any = { p: 0 };
if (x instanceof Object) {
    x.p; // No error, type any unaffected by type guard
}
else {
    x.p; // No error, type any unaffected by type guard
}
