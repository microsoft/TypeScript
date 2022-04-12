//// [intraExpressionInferences.ts]
// Repros from #47599

declare function callIt<T>(obj: {
    produce: (n: number) => T,
    consume: (x: T) => void
}): void;

callIt({
    produce: () => 0,
    consume: n => n.toFixed()
});

callIt({
    produce: _a => 0,
    consume: n => n.toFixed(),
});

callIt({
    produce() {
        return 0;
    },
    consume: n => n.toFixed()
});

declare function callItT<T>(obj: [(n: number) => T, (x: T) => void]): void;

callItT([() => 0, n => n.toFixed()]);
callItT([_a => 0, n => n.toFixed()]);

// Repro from #25092

interface MyInterface<T> {
    retrieveGeneric: (parameter: string) => T,
    operateWithGeneric: (generic: T) => string
}

const inferTypeFn = <T>(generic: MyInterface<T>) => generic;

const myGeneric = inferTypeFn({
    retrieveGeneric: parameter => 5,
    operateWithGeneric: generic => generic.toFixed()
});

// Repro #38623

function make<M>(o: { mutations: M,  action: (m: M) => void }) { }

make({
   mutations: {
       foo() { }
   },
   action: (a) => { a.foo() }
});

// Repro from #38845

declare function foo<A>(options: { a: A, b: (a: A) => void }): void;

foo({
    a: () => { return 42 },
    b(a) {},
});

foo({
    a: function () { return 42 },
    b(a) {},
});

foo({
    a() { return 42 },
    b(a) {},
});

// Repro from #38872

type Chain<R1, R2> = {
    a(): R1,
    b(a: R1): R2;
    c(b: R2): void;
};

function test<R1, R2>(foo: Chain<R1, R2>) {}

test({
    a: () => 0,
    b: (a) => 'a',
    c: (b) => {
        const x: string = b;
    }
});

test({
    a: () => 0,
    b: (a) => a,
    c: (b) => {
        const x: number = b;
    }
});

// Repro from #41712

class Wrapper<T = any> {
    public value?: T;
}

type WrappedMap = Record<string, Wrapper>;
type Unwrap<D extends WrappedMap> = {
    [K in keyof D]: D[K] extends Wrapper<infer T> ? T : never;
};

type MappingComponent<I extends WrappedMap, O extends WrappedMap> = {
    setup(): { inputs: I; outputs: O };
    map?: (inputs: Unwrap<I>) => Unwrap<O>;
};

declare function createMappingComponent<I extends WrappedMap, O extends WrappedMap>(def: MappingComponent<I, O>): void;

createMappingComponent({
    setup() {
        return {
            inputs: {
                num: new Wrapper<number>(),
                str: new Wrapper<string>()
            },
            outputs: {
                bool: new Wrapper<boolean>(),
                str: new Wrapper<string>()
            }
        };
    },
    map(inputs) {
        return {
            bool: inputs.nonexistent,
            str: inputs.num,  // Causes error
        }
    }
});

// Repro from #48279

function simplified<T>(props: { generator: () => T, receiver: (t: T) => any }) {}

function whatIWant<T>(props: { generator: (bob: any) => T, receiver: (t: T) => any }) {}

function nonObject<T>(generator: (bob: any) => T, receiver: (t: T) => any) {}

simplified({ generator: () => 123, receiver: (t) => console.log(t + 2) })
whatIWant({ generator: (bob) => bob ? 1 : 2, receiver: (t) => console.log(t + 2) })
nonObject((bob) => bob ? 1 : 2, (t) => console.log(t + 2))

// Repro from #48466

interface Opts<TParams, TDone, TMapped> {
    fetch: (params: TParams, foo: number) => TDone,
    map: (data: TDone) => TMapped
}

function example<TParams, TDone, TMapped>(options: Opts<TParams, TDone, TMapped>) {
    return (params: TParams) => {
        const data = options.fetch(params, 123)
        return options.map(data)
    }
}

interface Params {
    one: number
    two: string
}

example({
    fetch: (params: Params) => 123,
    map: (number) => String(number)
});

example({
    fetch: (params: Params, foo: number) => 123,
    map: (number) => String(number)
});

example({
    fetch: (params: Params, foo) => 123,
    map: (number) => String(number)
});

// Repro from #45255

declare const branch:
  <T, U extends T>(_: { test: T, if: (t: T) => t is U, then: (u: U) => void }) => void

declare const x: "a" | "b"

branch({
  test: x,
  if: (t): t is "a" => t === "a",
  then: u => {
    let test1: "a" = u
  }
})


//// [intraExpressionInferences.js]
"use strict";
// Repros from #47599
callIt({
    produce: function () { return 0; },
    consume: function (n) { return n.toFixed(); }
});
callIt({
    produce: function (_a) { return 0; },
    consume: function (n) { return n.toFixed(); }
});
callIt({
    produce: function () {
        return 0;
    },
    consume: function (n) { return n.toFixed(); }
});
callItT([function () { return 0; }, function (n) { return n.toFixed(); }]);
callItT([function (_a) { return 0; }, function (n) { return n.toFixed(); }]);
var inferTypeFn = function (generic) { return generic; };
var myGeneric = inferTypeFn({
    retrieveGeneric: function (parameter) { return 5; },
    operateWithGeneric: function (generic) { return generic.toFixed(); }
});
// Repro #38623
function make(o) { }
make({
    mutations: {
        foo: function () { }
    },
    action: function (a) { a.foo(); }
});
foo({
    a: function () { return 42; },
    b: function (a) { }
});
foo({
    a: function () { return 42; },
    b: function (a) { }
});
foo({
    a: function () { return 42; },
    b: function (a) { }
});
function test(foo) { }
test({
    a: function () { return 0; },
    b: function (a) { return 'a'; },
    c: function (b) {
        var x = b;
    }
});
test({
    a: function () { return 0; },
    b: function (a) { return a; },
    c: function (b) {
        var x = b;
    }
});
// Repro from #41712
var Wrapper = /** @class */ (function () {
    function Wrapper() {
    }
    return Wrapper;
}());
createMappingComponent({
    setup: function () {
        return {
            inputs: {
                num: new Wrapper(),
                str: new Wrapper()
            },
            outputs: {
                bool: new Wrapper(),
                str: new Wrapper()
            }
        };
    },
    map: function (inputs) {
        return {
            bool: inputs.nonexistent,
            str: inputs.num
        };
    }
});
// Repro from #48279
function simplified(props) { }
function whatIWant(props) { }
function nonObject(generator, receiver) { }
simplified({ generator: function () { return 123; }, receiver: function (t) { return console.log(t + 2); } });
whatIWant({ generator: function (bob) { return bob ? 1 : 2; }, receiver: function (t) { return console.log(t + 2); } });
nonObject(function (bob) { return bob ? 1 : 2; }, function (t) { return console.log(t + 2); });
function example(options) {
    return function (params) {
        var data = options.fetch(params, 123);
        return options.map(data);
    };
}
example({
    fetch: function (params) { return 123; },
    map: function (number) { return String(number); }
});
example({
    fetch: function (params, foo) { return 123; },
    map: function (number) { return String(number); }
});
example({
    fetch: function (params, foo) { return 123; },
    map: function (number) { return String(number); }
});
branch({
    test: x,
    "if": function (t) { return t === "a"; },
    then: function (u) {
        var test1 = u;
    }
});


//// [intraExpressionInferences.d.ts]
declare function callIt<T>(obj: {
    produce: (n: number) => T;
    consume: (x: T) => void;
}): void;
declare function callItT<T>(obj: [(n: number) => T, (x: T) => void]): void;
interface MyInterface<T> {
    retrieveGeneric: (parameter: string) => T;
    operateWithGeneric: (generic: T) => string;
}
declare const inferTypeFn: <T>(generic: MyInterface<T>) => MyInterface<T>;
declare const myGeneric: MyInterface<number>;
declare function make<M>(o: {
    mutations: M;
    action: (m: M) => void;
}): void;
declare function foo<A>(options: {
    a: A;
    b: (a: A) => void;
}): void;
declare type Chain<R1, R2> = {
    a(): R1;
    b(a: R1): R2;
    c(b: R2): void;
};
declare function test<R1, R2>(foo: Chain<R1, R2>): void;
declare class Wrapper<T = any> {
    value?: T;
}
declare type WrappedMap = Record<string, Wrapper>;
declare type Unwrap<D extends WrappedMap> = {
    [K in keyof D]: D[K] extends Wrapper<infer T> ? T : never;
};
declare type MappingComponent<I extends WrappedMap, O extends WrappedMap> = {
    setup(): {
        inputs: I;
        outputs: O;
    };
    map?: (inputs: Unwrap<I>) => Unwrap<O>;
};
declare function createMappingComponent<I extends WrappedMap, O extends WrappedMap>(def: MappingComponent<I, O>): void;
declare function simplified<T>(props: {
    generator: () => T;
    receiver: (t: T) => any;
}): void;
declare function whatIWant<T>(props: {
    generator: (bob: any) => T;
    receiver: (t: T) => any;
}): void;
declare function nonObject<T>(generator: (bob: any) => T, receiver: (t: T) => any): void;
interface Opts<TParams, TDone, TMapped> {
    fetch: (params: TParams, foo: number) => TDone;
    map: (data: TDone) => TMapped;
}
declare function example<TParams, TDone, TMapped>(options: Opts<TParams, TDone, TMapped>): (params: TParams) => TMapped;
interface Params {
    one: number;
    two: string;
}
declare const branch: <T, U extends T>(_: {
    test: T;
    if: (t: T) => t is U;
    then: (u: U) => void;
}) => void;
declare const x: "a" | "b";
