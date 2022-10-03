// @checkJs: true
// @allowJs: true
// @noEmit: true
// @filename: decls.d.ts
declare function f0<T>(x?: T): T;
declare function f1<T, U = number>(x?: T): [T, U];
declare class C0<T> {
    y: T;
    constructor(x?: T);
}
declare class C1<T, U = number> {
    y: [T, U];
    constructor(x?: T);
}
// @filename: main.js
const f0_v0 = f0();
const f0_v1 = f0(1);

const f1_c0 = f1();
const f1_c1 = f1(1);

const C0_v0 = new C0();
const C0_v0_y = C0_v0.y;

const C0_v1 = new C0(1);
const C0_v1_y = C0_v1.y;

const C1_v0 = new C1();
const C1_v0_y = C1_v0.y;

const C1_v1 = new C1(1);
const C1_v1_y = C1_v1.y;

class C0_B0 extends C0 {}
class C0_B1 extends C0 {
    constructor() {
        super();
    }
}
class C0_B2 extends C0 {
    constructor() {
        super(1);
    }
}

const C0_B0_v0 = new C0_B0();
const C0_B0_v0_y = C0_B0_v0.y;

const C0_B0_v1 = new C0_B0(1);
const C0_B0_v1_y = C0_B0_v1.y;

const C0_B1_v0 = new C0_B1();
const C0_B1_v0_y = C0_B1_v0.y;

const C0_B2_v0 = new C0_B2();
const C0_B2_v0_y = C0_B2_v0.y;

class C1_B0 extends C1 {}
class C1_B1 extends C1 {
    constructor() {
        super();
    }
}
class C1_B2 extends C1 {
    constructor() {
        super(1);
    }
}

const C1_B0_v0 = new C1_B0();
const C1_B0_v0_y = C1_B0_v0.y;

const C1_B0_v1 = new C1_B0(1);
const C1_B0_v1_y = C1_B0_v1.y;

const C1_B1_v0 = new C1_B1();
const C1_B1_v0_y = C1_B1_v0.y;

const C1_B2_v0 = new C1_B2();
const C1_B2_v0_y = C1_B2_v0.y;
