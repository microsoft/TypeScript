//// [tests/cases/conformance/es6/for-ofStatements/for-of58.ts] ////

//// [for-of58.ts]
type X = { x: 'x' };
type Y = { y: 'y' };

declare const arr: X[] & Y[];

for (const item of arr) {
    item.x;
    item.y;
}


//// [for-of58.js]
for (const item of arr) {
    item.x;
    item.y;
}
