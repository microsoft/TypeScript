// @strictNullChecks: true
// @declaration: true

function f1<T>(x: Partial<T>, y: Readonly<T>) {
    let obj: {};
    obj = x;
    obj = y;
}

function f2<T>(x: Partial<T>, y: Readonly<T>) {
    let obj: { [x: string]: any };
    obj = x;
    obj = y;
}

function f3<T>(x: Partial<T>) {
    x = {};
}

// Repro from #12900

interface Base {
    foo: { [key: string]: any };
    bar: any;
    baz: any;
}

interface E1<T> extends Base {
    foo: T;
}

interface Something { name: string, value: string };
interface E2 extends Base {
    foo: Partial<Something>;  // or other mapped type
}

interface E3<T> extends Base {
    foo: Partial<T>; // or other mapped type
}

// Repro from #13747

class Form<T> {
    private values: {[P in keyof T]?: T[P]} = {}
}
