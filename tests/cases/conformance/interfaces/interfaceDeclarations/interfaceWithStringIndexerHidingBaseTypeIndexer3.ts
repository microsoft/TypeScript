interface Base {
    [x: number]: { a: number }
    1: {
        a: number; b: number;
    }
}

interface Derived extends Base {
    [x: number]: {
        a: number; b: number
    };
    // error
    2: {
        a: number;
    }
}