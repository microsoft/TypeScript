interface Promise<T> {
    then<U>(cb: (x: T) => Promise<U>): Promise<U>;
}

interface CPromise<T extends { x: any; }> {
    then<U extends { x: any; }>(cb: (x: T) => Promise<U>): Promise<U>;
}

interface Foo { x; }
interface Bar { x; y; }

var a: Promise<Foo>;
var b: Promise<Bar>;
a = b; // ok
b = a; // ok

var a2: CPromise<Foo>;
var b2: CPromise<Bar>;
a2 = b2; // ok
b2 = a2; // was error
