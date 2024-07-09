// @target: ES5
// @declaration: true

class c {
}
class g<T> {
}
module m {
    export class c {
    }
}

// Object literal with everything
var x: {
    // Call signatures
    (a: number): c;
    (a: string): g<string>;

    // Construct signatures
    new (a: number): c;
    new (a: string): m.c;

    // Indexers
    [n: number]: c;
    [n: string]: c;

    // Properties
    a: c;
    b: g<string>;

    // methods
    m1(): g<number>;
    m2(a: string, b?: number, ...c: c[]): string;
};


// Function type
var y: (a: string) => string;

// constructor type
var z: new (a: string) => m.c;