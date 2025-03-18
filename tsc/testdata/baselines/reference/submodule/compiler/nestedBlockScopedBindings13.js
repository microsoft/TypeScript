//// [tests/cases/compiler/nestedBlockScopedBindings13.ts] ////

//// [nestedBlockScopedBindings13.ts]
for (; false;) {
    let x;
    () => x;
}

for (; false;) {
    let y;
    y = 1;
}

//// [nestedBlockScopedBindings13.js]
for (; false;) {
    let x;
    () => x;
}
for (; false;) {
    let y;
    y = 1;
}
