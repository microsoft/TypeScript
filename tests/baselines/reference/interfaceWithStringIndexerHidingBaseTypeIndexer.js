//// [interfaceWithStringIndexerHidingBaseTypeIndexer.ts]
interface Base {
    [x: string]: { a: number }
    x: {
        a: number; b: number;
    }
}

interface Derived extends Base {
    [x: string]: {
        a: number; b: number
    };
    // error
    y: {
        a: number;
    }
}

//// [interfaceWithStringIndexerHidingBaseTypeIndexer.js]
