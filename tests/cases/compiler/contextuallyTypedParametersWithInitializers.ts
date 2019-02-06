// @strict: true
// @declaration: true

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
