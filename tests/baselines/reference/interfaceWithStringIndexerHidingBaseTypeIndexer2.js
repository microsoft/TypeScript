//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceWithStringIndexerHidingBaseTypeIndexer2.ts] ////

//// [interfaceWithStringIndexerHidingBaseTypeIndexer2.ts]
interface Base {
    [x: number]: { a: number; b: number }
    x: {
        a: number; b: number;
    }
}

interface Derived extends Base {
    [x: string]: {
        a: number
    };

    y: {
        a: number;
    }
    // error
    1: {
        a: number;
    }
}

//// [interfaceWithStringIndexerHidingBaseTypeIndexer2.js]
