//// [tests/cases/compiler/nestedBlockScopedBindings7.ts] ////

//// [nestedBlockScopedBindings7.ts]
for (let x; false;) {
    () => x;
}

for (let y; false;) {
    y = 1;
}

//// [nestedBlockScopedBindings7.js]
for (let x; false;) {
    () => x;
}
for (let y; false;) {
    y = 1;
}
