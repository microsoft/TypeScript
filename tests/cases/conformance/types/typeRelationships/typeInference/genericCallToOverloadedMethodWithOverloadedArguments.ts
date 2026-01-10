
namespace m1 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;

    declare var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

namespace m2 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;

    declare var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

namespace m3 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;

    declare var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

namespace m4 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;

    declare var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

namespace m5 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => U, progress?: (preservation: any) => void): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;

    declare var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

namespace m6 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;
    declare function testFunction(b: boolean): Promise<boolean>;

    declare var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}
