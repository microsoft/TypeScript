//// [tests/cases/compiler/contextuallyTypedParametersWithInitializers1.ts] ////

//// [contextuallyTypedParametersWithInitializers1.ts]
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


//// [contextuallyTypedParametersWithInitializers1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSomething = void 0;
var f10 = function (_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
};
var f11 = id1(function (_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
});
var f12 = id2(function (_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
});
var f13 = id3(function (_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
});
var f14 = id4(function (_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
});
var f20 = function (foo) {
    if (foo === void 0) { foo = 42; }
    return foo;
};
var f21 = id1(function (foo) {
    if (foo === void 0) { foo = 42; }
    return foo;
});
var f22 = id2(function (foo) {
    if (foo === void 0) { foo = 42; }
    return foo;
});
var f25 = id5(function (foo) {
    if (foo === void 0) { foo = 42; }
    return foo;
});
var f1 = function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}; // number
var f2 = function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}; // number
var f3 = function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}; // number
var f4 = function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}; // number
var f5 = function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}; // any
var f6 = function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}; // number
var f7 = function (x) { return 0; }; // Implicit any error
var f8 = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    return 0;
}; // []
g1(function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}); // number
g2(function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}); // number
g3(function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}); // number
g4(function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}); // number
g5(function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}); // any
g6(function (x) {
    if (x === void 0) { x = 1; }
    return 0;
}); // number
g6(function (x) { return 0; }); // Implicit any error
g6(function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    return 0;
}); // []
// Repro from #28816
function id(input) { return input; }
function getFoo(_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
}
var newGetFoo = id(getFoo);
var newGetFoo2 = id(function getFoo(_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
});
function add(x, y) {
    if (y === void 0) { y = 0; }
    return x + y;
}
var memoizedAdd = memoize(add);
var add2 = function (x, y) {
    if (y === void 0) { y = 0; }
    return x + y;
};
var memoizedAdd2 = memoize(add2);
var memoizedAdd3 = memoize(function (x, y) {
    if (y === void 0) { y = 0; }
    return x + y;
});
function executeSomething() {
    return execute(function (root, debug) {
        if (debug === void 0) { debug = true; }
        if (debug) {
            root.innerHTML = '';
        }
    });
}
exports.executeSomething = executeSomething;
var fz1 = function (debug) {
    if (debug === void 0) { debug = true; }
    return false;
};
var fz2 = function (debug) {
    if (debug === void 0) { debug = true; }
    return false;
};


//// [contextuallyTypedParametersWithInitializers1.d.ts]
export declare function executeSomething(): Promise<string>;
