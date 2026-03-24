// @target: es2015
interface Base {
    x: { a: number };
}

interface Derived extends Base { // error
    x: {
        a: string;
    };
}