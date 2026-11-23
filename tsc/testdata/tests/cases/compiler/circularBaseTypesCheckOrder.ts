// @noEmit: true
// @checkOrder: default, reverse, typesfirst, editorfirst

// The base types of a cycle of interfaces are resolved as if the cycle
// were entered at the interface declared first, wherever it is entered:
// 'Base' has none, and the others keep theirs.

declare let z: Derived2;
z.x;
z.y;

interface Base extends Derived2 {
    x: string;
}

interface Derived extends Base {
    y: string;
}

interface Derived2 extends Derived {
    z: string;
}

declare let d: Derived;
d.x;
