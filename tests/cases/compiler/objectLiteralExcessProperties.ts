interface Book {
    foreword: string;
}

interface Cover {
    color?: string;
}

var b1: Book = { forword: "oops" };

var b2: Book | string = { foreward: "nope" };

var b3: Book | (Book[]) = [{ foreword: "hello" }, { forwards: "back" }];

var b4: Book & Cover = { foreword: "hi", colour: "blue" };

var b5: Book & Cover = { foreward: "hi", color: "blue" };

var b6: Book & Cover = { foreword: "hi", color: "blue", price: 10.99 };

var b7: Book & number = { foreword: "hi", price: 10.99 };

var b8: Cover | Cover[] = { couleur : "non" };

var b9: Book | Book[] = { forewarned: "still no" };

interface Indexed {
    [n: number]: Cover;
}

var b10: Indexed = { 0: { }, '1': { } }; // ok

var b11: Indexed = { 0: { colour: "blue" } }; // nested object literal still errors

// Repros inspired by #28752

function test<T extends IFoo>() {
    // No excess property checks on generic types
    const obj1: T = { name: "test" };
    // No excess property checks on intersections involving generics
    const obj2: T & { prop: boolean } = { name: "test", prop: true };
    // Excess property checks only on non-generic parts of unions
    const obj3: T | { prop: boolean } = { name: "test", prop: true };
    // Excess property checks only on non-generic parts of unions
    const obj4: T & { prop: boolean } | { name: string } = { name: "test", prop: true };
    // No excess property checks when union includes 'object' type
    const obj5: object | { x: string } = { z: 'abc' }
    // The 'object' type has no effect on intersections
    const obj6: object & { x: string } = { z: 'abc' }
}
