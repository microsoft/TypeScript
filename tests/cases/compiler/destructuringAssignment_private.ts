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
