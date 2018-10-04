//// [genericCallToOverloadedMethodWithOverloadedArguments.ts]
module m1 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;

    var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

module m2 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;

    var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

module m3 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;

    var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

module m4 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;

    var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

module m5 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => U, progress?: (preservation: any) => void): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;

    var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}

//////////////////////////////////////

module m6 {
    interface Promise<T> {
        then<U>(cb: (x: T) => Promise<U>): Promise<U>;
        then<U>(cb: (x: T) => Promise<U>, error?: (error: any) => Promise<U>): Promise<U>;
    }

    declare function testFunction(n: number): Promise<number>;
    declare function testFunction(s: string): Promise<string>;
    declare function testFunction(b: boolean): Promise<boolean>;

    var numPromise: Promise<number>;
    var newPromise = numPromise.then(testFunction);
}


//// [genericCallToOverloadedMethodWithOverloadedArguments.js]
var m1;
(function (m1) {
    var numPromise;
    var newPromise = numPromise.then(testFunction);
})(m1 || (m1 = {}));
//////////////////////////////////////
var m2;
(function (m2) {
    var numPromise;
    var newPromise = numPromise.then(testFunction);
})(m2 || (m2 = {}));
//////////////////////////////////////
var m3;
(function (m3) {
    var numPromise;
    var newPromise = numPromise.then(testFunction);
})(m3 || (m3 = {}));
//////////////////////////////////////
var m4;
(function (m4) {
    var numPromise;
    var newPromise = numPromise.then(testFunction);
})(m4 || (m4 = {}));
//////////////////////////////////////
var m5;
(function (m5) {
    var numPromise;
    var newPromise = numPromise.then(testFunction);
})(m5 || (m5 = {}));
//////////////////////////////////////
var m6;
(function (m6) {
    var numPromise;
    var newPromise = numPromise.then(testFunction);
})(m6 || (m6 = {}));
