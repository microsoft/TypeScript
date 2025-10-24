//// [tests/cases/compiler/discriminantsAndTypePredicates.ts] ////

//// [discriminantsAndTypePredicates.ts]
// Repro from #10145

interface A { type: 'A' }
interface B { type: 'B' }

function isA(x: A | B): x is A { return x.type === 'A'; }
function isB(x: A | B): x is B { return x.type === 'B'; }

function foo1(x: A | B): any {
    x;  // A | B
    if (isA(x)) {
        return x;  // A
    }
    x;  // B
    if (isB(x)) {
        return x;  // B
    }
    x;  // never
}

function foo2(x: A | B): any {
    x;  // A | B
    if (x.type === 'A') {
        return x;  // A
    }
    x;  // B
    if (x.type === 'B') {
        return x;  // B
    }
    x;  // never
}

//// [discriminantsAndTypePredicates.js]
// Repro from #10145
function isA(x) { return x.type === 'A'; }
function isB(x) { return x.type === 'B'; }
function foo1(x) {
    x; // A | B
    if (isA(x)) {
        return x; // A
    }
    x; // B
    if (isB(x)) {
        return x; // B
    }
    x; // never
}
function foo2(x) {
    x; // A | B
    if (x.type === 'A') {
        return x; // A
    }
    x; // B
    if (x.type === 'B') {
        return x; // B
    }
    x; // never
}
