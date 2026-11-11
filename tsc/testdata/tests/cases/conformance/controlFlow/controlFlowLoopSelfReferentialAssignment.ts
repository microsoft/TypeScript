// @strict: true
// @noEmit: true

// Repro from #59715

declare class Child { parent: Parent | null; }
declare class Parent { parent: GrandParent | null; }
declare class GrandParent { parent: GreatGrandParent | null; }
declare class GreatGrandParent { parent: null; }
declare const child: Child;

function three() {
    let currentParent: GreatGrandParent | GrandParent | Parent | null = child.parent;
    while (currentParent) {
        currentParent; // should be Parent | GrandParent | GreatGrandParent
        currentParent = currentParent.parent;
    }
}

// Four levels: also wrong before #43183 (one transfer step short per nesting depth)

declare class A1 { nom: "a1"; next(): A2 | null; }
declare class A2 { nom: "a2"; next(): A3 | null; }
declare class A3 { nom: "a3"; next(): A4 | null; }
declare class A4 { nom: "a4"; next(): null; }
type All = A1 | A2 | A3 | A4;

function four(a: A1) {
    let p: All | null = a;
    while (p) {
        p; // should be A1 | A2 | A3 | A4
        if (p.nom === "a4") {
            p; // should be A4, not never
        }
        p = p.next();
    }
}

// for-statement form from the issue thread

function forLoop(a: A1) {
    for (let q: All | null = a; q !== null; q = q.next()) {
        q; // should be A1 | A2 | A3 | A4
    }
}

// Same chain via a property access reference, and soundness: this must be an error.

declare class WithProp1 { parent: WithProp2 | null; prop: number; }
declare class WithProp2 { parent: WithProp3 | null; prop: number; }
declare class WithProp3 { parent: null; }

function unsound(start: WithProp1 | null) {
    let cur: WithProp1 | WithProp2 | WithProp3 | null = start;
    while (cur) {
        const n: number = cur.prop; // should be an error: WithProp3 has no prop
        cur = cur.parent;
    }
}

// Evolving array created in an outer loop and pushed in an inner loop. The fix must not
// iterate for auto-typed variables: doing so finalizes the evolving array and degrades it to any[].

declare const outer: number[][];
function evolving() {
    let result;
    for (const list of outer) {
        result ||= [];
        for (const n of list) result.push(n);
    }
    return result; // should be number[] | undefined
}

// Fifty levels deep. Each pass over the loop junction adds at least one constituent of the
// declared union, so the number of passes scales linearly with the depth of the chain, and
// the bound (union size + 1) guarantees convergence at any depth.

declare class D1 { depth: 1; parent: D2 | null; }
declare class D2 { depth: 2; parent: D3 | null; }
declare class D3 { depth: 3; parent: D4 | null; }
declare class D4 { depth: 4; parent: D5 | null; }
declare class D5 { depth: 5; parent: D6 | null; }
declare class D6 { depth: 6; parent: D7 | null; }
declare class D7 { depth: 7; parent: D8 | null; }
declare class D8 { depth: 8; parent: D9 | null; }
declare class D9 { depth: 9; parent: D10 | null; }
declare class D10 { depth: 10; parent: D11 | null; }
declare class D11 { depth: 11; parent: D12 | null; }
declare class D12 { depth: 12; parent: D13 | null; }
declare class D13 { depth: 13; parent: D14 | null; }
declare class D14 { depth: 14; parent: D15 | null; }
declare class D15 { depth: 15; parent: D16 | null; }
declare class D16 { depth: 16; parent: D17 | null; }
declare class D17 { depth: 17; parent: D18 | null; }
declare class D18 { depth: 18; parent: D19 | null; }
declare class D19 { depth: 19; parent: D20 | null; }
declare class D20 { depth: 20; parent: D21 | null; }
declare class D21 { depth: 21; parent: D22 | null; }
declare class D22 { depth: 22; parent: D23 | null; }
declare class D23 { depth: 23; parent: D24 | null; }
declare class D24 { depth: 24; parent: D25 | null; }
declare class D25 { depth: 25; parent: D26 | null; }
declare class D26 { depth: 26; parent: D27 | null; }
declare class D27 { depth: 27; parent: D28 | null; }
declare class D28 { depth: 28; parent: D29 | null; }
declare class D29 { depth: 29; parent: D30 | null; }
declare class D30 { depth: 30; parent: D31 | null; }
declare class D31 { depth: 31; parent: D32 | null; }
declare class D32 { depth: 32; parent: D33 | null; }
declare class D33 { depth: 33; parent: D34 | null; }
declare class D34 { depth: 34; parent: D35 | null; }
declare class D35 { depth: 35; parent: D36 | null; }
declare class D36 { depth: 36; parent: D37 | null; }
declare class D37 { depth: 37; parent: D38 | null; }
declare class D38 { depth: 38; parent: D39 | null; }
declare class D39 { depth: 39; parent: D40 | null; }
declare class D40 { depth: 40; parent: D41 | null; }
declare class D41 { depth: 41; parent: D42 | null; }
declare class D42 { depth: 42; parent: D43 | null; }
declare class D43 { depth: 43; parent: D44 | null; }
declare class D44 { depth: 44; parent: D45 | null; }
declare class D45 { depth: 45; parent: D46 | null; }
declare class D46 { depth: 46; parent: D47 | null; }
declare class D47 { depth: 47; parent: D48 | null; }
declare class D48 { depth: 48; parent: D49 | null; }
declare class D49 { depth: 49; parent: D50 | null; }
declare class D50 { depth: 50; parent: null; }
type Deep = D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | D21 | D22 | D23 | D24 | D25 | D26 | D27 | D28 | D29 | D30 | D31 | D32 | D33 | D34 | D35 | D36 | D37 | D38 | D39 | D40 | D41 | D42 | D43 | D44 | D45 | D46 | D47 | D48 | D49 | D50;
declare const deepStart: D1 | null;

function fifty() {
    let cur: Deep | null = deepStart;
    while (cur) {
        cur; // should be all of D1 through D50
        if (cur.depth === 50) {
            cur; // should be D50, not never
        }
        cur = cur.parent;
    }
}

// An inner loop between the self-assignment and the back edge. The inner loop junction is
// reached while the outer one is still being computed and must not keep a cached type derived
// from the outer junction's partial union.

function innerLoopAfter(a: A1) {
    let p: All | null = a;
    while (p) {
        p; // should be A1 | A2 | A3 | A4
        p = p.next();
        for (let i = 0; i < 1; i++) {}
    }
}

function innerLoopReads(a: A1) {
    let p: All | null = a;
    while (p) {
        p; // should be A1 | A2 | A3 | A4
        p = p.next();
        for (let i = 0; i < 1; i++) {
            p; // should be A2 | A3 | A4 | null
        }
    }
}

function innerWhileAfter(a: A1) {
    let p: All | null = a;
    while (p) {
        p; // should be A1 | A2 | A3 | A4
        p = p.next();
        while (Math.random()) {}
    }
}

// Three loop levels. Cache entries for both inner junctions are created while the outer
// junction is in progress and must be invalidated on the outer retry.

function threeLevelsAfter(a: A1) {
    let p: All | null = a;
    while (p) {
        p; // should be A1 | A2 | A3 | A4, alias All
        p = p.next();
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                p; // should be A2 | A3 | A4 | null
            }
        }
    }
}

function threeLevelsInnermostAssigns(a: A1) {
    let p: All | null = a;
    while (p) {
        p; // should be A1 | A2 | A3 | A4, alias All
        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                if (p) { // p here is All | null: this loop's own back edge brings the null back
                    p = p.next(); // the target shows the declared All | null; the assigned value is A2 | A3 | A4 | null
                    p; // should be A2 | A3 | A4 | null, the narrowed type after the assignment
                }
            }
        }
    }
}
