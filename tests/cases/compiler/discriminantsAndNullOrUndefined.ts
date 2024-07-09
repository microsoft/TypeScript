// @strictNullChecks: true

// Repro from #10228

interface A { kind: 'A'; }
interface B { kind: 'B'; }

type C = A | B | undefined;

function never(_: never): never {
    throw new Error();
}

function useA(_: A): void { }
function useB(_: B): void { }

declare var c: C;

if (c !== undefined) {
    switch (c.kind) {
        case 'A': useA(c); break;
        case 'B': useB(c); break;
        default: never(c);
    }
}