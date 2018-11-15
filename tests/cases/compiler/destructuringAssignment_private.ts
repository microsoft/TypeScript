class C {
    private x = 0;
    private o = [{ a: 1 }];
}
let x: number;
([{ a: { x } }] = [{ a: new C() }]);
({ o: [{ a: x }]} = new C());
