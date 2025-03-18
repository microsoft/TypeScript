//// [tests/cases/compiler/destructuringAssignment_private.ts] ////

//// [destructuringAssignment_private.ts]
class C {
    private x = 0;
    private o = [{ a: 1 }];
}
let x: number;
([{ a: { x } }] = [{ a: new C() }]);
({ o: [{ a: x }]} = new C());

const nameX = "x";
([{ a: { [nameX]: x } }] = [{ a: new C() }]);

const nameO = "o";
({ [nameO]: [{ a: x }]} = new C());


//// [destructuringAssignment_private.js]
class C {
    x = 0;
    o = [{ a: 1 }];
}
let x;
([{ a: { x } }] = [{ a: new C() }]);
({ o: [{ a: x }] } = new C());
const nameX = "x";
([{ a: { [nameX]: x } }] = [{ a: new C() }]);
const nameO = "o";
({ [nameO]: [{ a: x }] } = new C());
