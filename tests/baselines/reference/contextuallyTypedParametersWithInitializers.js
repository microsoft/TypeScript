//// [contextuallyTypedParametersWithInitializers.ts]
declare function id1<T>(input: T): T;
declare function id2<T extends (x: any) => any>(input: T): T;
declare function id3<T extends (x: { foo: any }) => any>(input: T): T;
declare function id4<T extends (x: { foo?: number }) => any>(input: T): T;
declare function id5<T extends (x?: number) => any>(input: T): T;

const f10 = function ({ foo = 42 }) { return foo };
const f11 = id1(function ({ foo = 42 }) { return foo });  // Implicit any error
const f12 = id2(function ({ foo = 42 }) { return foo });
const f13 = id3(function ({ foo = 42 }) { return foo });
const f14 = id4(function ({ foo = 42 }) { return foo });

const f20 = function (foo = 42) { return foo };
const f21 = id1(function (foo = 42) { return foo });  // Implicit any error
const f22 = id2(function (foo = 42) { return foo });
const f25 = id5(function (foo = 42) { return foo });

// Repro from #28816

function id<T>(input: T): T { return input }

function getFoo ({ foo = 42 }) {
  return foo;
}

const newGetFoo = id(getFoo);
const newGetFoo2 = id(function getFoo ({ foo = 42 }) {
  return foo;
});


//// [contextuallyTypedParametersWithInitializers.js]
"use strict";
var f10 = function (_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
};
var f11 = id1(function (_a) {
    var _b = _a.foo, foo = _b === void 0 ? 42 : _b;
    return foo;
}); // Implicit any error
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
}); // Implicit any error
var f22 = id2(function (foo) {
    if (foo === void 0) { foo = 42; }
    return foo;
});
var f25 = id5(function (foo) {
    if (foo === void 0) { foo = 42; }
    return foo;
});
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


//// [contextuallyTypedParametersWithInitializers.d.ts]
declare function id1<T>(input: T): T;
declare function id2<T extends (x: any) => any>(input: T): T;
declare function id3<T extends (x: {
    foo: any;
}) => any>(input: T): T;
declare function id4<T extends (x: {
    foo?: number;
}) => any>(input: T): T;
declare function id5<T extends (x?: number) => any>(input: T): T;
declare const f10: ({ foo }: {
    foo?: number | undefined;
}) => number;
declare const f11: ({ foo }: any) => any;
declare const f12: ({ foo }: any) => any;
declare const f13: ({ foo }: {
    foo: any;
}) => any;
declare const f14: ({ foo }: {
    foo?: number | undefined;
}) => number;
declare const f20: (foo?: number) => number;
declare const f21: (foo?: any) => any;
declare const f22: (foo?: any) => any;
declare const f25: (foo?: number | undefined) => number;
declare function id<T>(input: T): T;
declare function getFoo({ foo }: {
    foo?: number | undefined;
}): number;
declare const newGetFoo: typeof getFoo;
declare const newGetFoo2: ({ foo }: any) => any;
