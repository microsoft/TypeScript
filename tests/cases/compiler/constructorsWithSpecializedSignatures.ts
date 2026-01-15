// errors
declare class C {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: number);
}

// ok
declare class C2 {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: string);
}

// errors
class D {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: number);
    constructor(x: "hi") { }
}

// overloads are ok
class D2 {
    constructor(x: "hi");
    constructor(x: "foo");
    constructor(x: string);
    constructor(x: "hi") { } // error
}

// errors
interface I {
    new (x: "hi");
    new (x: "foo");
    new (x: number);
}

// ok
interface I2 {
    new (x: "hi");
    new (x: "foo");
    new (x: string);
}