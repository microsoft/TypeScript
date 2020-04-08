//// [interfaceThatHidesBaseProperty2.ts]
interface Base {
    x: { a: number };
}

interface Derived extends Base { // error
    x: {
        a: string;
    };
}

//// [interfaceThatHidesBaseProperty2.js]
