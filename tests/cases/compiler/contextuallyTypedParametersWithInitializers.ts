// @strict: true
// @declaration: true

declare function id1<T>(input: T): T;
declare function id2<T extends (x: any) => any>(input: T): T;
declare function id3<T extends (x: { foo: any }) => any>(input: T): T;
declare function id4<T extends (x: { foo?: number }) => any>(input: T): T;
declare function id5<T extends (x?: number) => any>(input: T): T;

const f10 = function ({ foo = 42 }) { return foo };
const f11 = id1(function ({ foo = 42 }) { return foo });
const f12 = id2(function ({ foo = 42 }) { return foo });
const f13 = id3(function ({ foo = 42 }) { return foo });
const f14 = id4(function ({ foo = 42 }) { return foo });

const f20 = function (foo = 42) { return foo };
const f21 = id1(function (foo = 42) { return foo });
const f22 = id2(function (foo = 42) { return foo });
const f25 = id5(function (foo = 42) { return foo });

const f1 = (x = 1) => 0;  // number
const f2: any = (x = 1) => 0;  // number
const f3: unknown = (x = 1) => 0;  // number
const f4: Function = (x = 1) => 0;  // number
const f5: (...args: any[]) => any = (x = 1) => 0;  // any
const f6: () => any = (x = 1) => 0;  // number
const f7: () => any = (x?) => 0;  // Implicit any error
const f8: () => any = (...x) => 0;  // []

declare function g1<T>(x: T): T;
declare function g2<T extends any>(x: T): T;
declare function g3<T extends unknown>(x: T): T;
declare function g4<T extends Function>(x: T): T;
declare function g5<T extends (...args: any[]) => any>(x: T): T;
declare function g6<T extends () => any>(x: T): T;

g1((x = 1) => 0);  // number
g2((x = 1) => 0);  // number
g3((x = 1) => 0);  // number
g4((x = 1) => 0);  // number
g5((x = 1) => 0);  // any
g6((x = 1) => 0);  // number
g6((x?) => 0);     // Implicit any error
g6((...x) => 0);   // []

// Repro from #28816

function id<T>(input: T): T { return input }

function getFoo ({ foo = 42 }) {
  return foo;
}

const newGetFoo = id(getFoo);
const newGetFoo2 = id(function getFoo ({ foo = 42 }) {
  return foo;
});

// Repro from comment in #30840

declare function memoize<F extends Function>(func: F): F;

function add(x: number, y = 0): number {
    return x + y;
}
const memoizedAdd = memoize(add);

const add2 = (x: number, y = 0): number => x + y;
const memoizedAdd2 = memoize(add2);

const memoizedAdd3 = memoize((x: number, y = 0): number => x + y);

// Repro from #36052

declare function execute(script: string | Function): Promise<string>;
  
export function executeSomething() {
    return execute((root: HTMLElement, debug = true) => {
        if (debug) {
            root.innerHTML = '';
        }
    });
}

const fz1 = (debug = true) => false;
const fz2: Function = (debug = true) => false;
