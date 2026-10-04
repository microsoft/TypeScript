// @target: esnext
// @noEmit: true
// @noTypesAndSymbols: true

declare const dec: any;

// ok
@dec(() => C1) class C1 { }

// error
@dec(C2) class C2 { }

// error
@dec((() => C3)()) class C3 { }

// ok
class C4 {
    @dec(() => C4) static method() {}
    @dec(() => C4) static get x() { return this.y; }
    @dec(() => C4) static set x(v) {}
    @dec(() => C4) static y: any;
    @dec(() => C4) static accessor z: any;

    @dec(() => C4) method() {}
    @dec(() => C4) get x() { return this.y; }
    @dec(() => C4) set x(v) {}
    @dec(() => C4) y: any;
    @dec(() => C4) accessor z: any;
}

// error
class C5 {
    @dec(C5) static method() {}
    @dec(C5) static get x() { return this.y; }
    @dec(C5) static set x(v) {}
    @dec(C5) static y: any;
    @dec(C5) static accessor z: any;

    @dec(C5) method() {}
    @dec(C5) get x() { return this.y; }
    @dec(C5) set x(v) {}
    @dec(C5) y: any;
    @dec(C5) accessor z: any;
}

// error
class C6 {
    @dec((() => C6)()) static method() {}
    @dec((() => C6)()) static get x() { return this.y; }
    @dec((() => C6)()) static set x(v) {}
    @dec((() => C6)()) static y: any;
    @dec((() => C6)()) static accessor z: any;

    @dec((() => C6)()) method() {}
    @dec((() => C6)()) get x() { return this.y; }
    @dec((() => C6)()) set x(v) {}
    @dec((() => C6)()) y: any;
    @dec((() => C6)()) accessor z: any;
}
