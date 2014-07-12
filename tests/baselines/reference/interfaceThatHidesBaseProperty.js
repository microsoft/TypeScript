//// [interfaceThatHidesBaseProperty.ts]
interface Base {
    x: { a: number };
}

interface Derived extends Base {
    x: {
        a: number; b: number;
    };
}

//// [interfaceThatHidesBaseProperty.js]
