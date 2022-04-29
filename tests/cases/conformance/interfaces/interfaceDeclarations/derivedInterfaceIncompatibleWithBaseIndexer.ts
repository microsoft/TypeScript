interface Base {
    [x: number]: { x: number; y: number; };
    [x: string]: { x: number; }
}

interface Derived extends Base {
    1: { y: number } // error
}

interface Derived2 extends Base {
    '1': { y: number } // error
}

interface Derived3 extends Base {
    foo: { y: number } // error
}

interface Derived4 extends Base {
    foo(): { x: number } // error
}

// satisifies string indexer but not numeric indexer
interface Derived5 extends Base {
    1: { x: number } // error
}

interface Derived5 extends Base {
    '1': { x: number } // error
}