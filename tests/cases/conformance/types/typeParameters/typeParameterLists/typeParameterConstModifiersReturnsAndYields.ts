// @strict: true
// @target: esnext
// @noEmit: true

enum E { Val, Val2 }

declare function test1<const T>(create: () => T): T;

const result1 = test1(() => ['a']);
const result2 = test1(() => `a${Math.random()}`);
const result3 = test1(() => 'a');
const result4 = test1(() => true);
const result5 = test1(() => 101n);
const result6 = test1(() => false);
const result7 = test1(() => 11111);
const result8 = test1(() => E.Val);

const result9 = test1(() => { return ['a']; });
const result10 = test1(() => { return `a${Math.random()}`; });
const result11 = test1(() => { return 'a'; });
const result12 = test1(() => { return true; });
const result13 = test1(() => { return 101n; });
const result14 = test1(() => { return false; });
const result15 = test1(() => { return 11111; });
const result16 = test1(() => { return E.Val; });

const result17 = test1(async () => 'foo');
const result18 = test1(async () => { return 'foo'; });

declare function test2<const T>(create: () => Promise<T>): T;

const result19 = test2(async () => 'foo');
const result20 = test2(async () => { return 'foo'; });

declare function test3<const T, const R>(arg: () => Generator<T, R>): [T, R]

const result21 = test3(function*() {
    yield 10;
    return '1';
});

declare function test4<const T, const R>(arg: () => AsyncGenerator<T, R>): [T, R]

const result22 = test4(async function*() {
    yield 10;
    return '1';
});

// https://github.com/microsoft/TypeScript/issues/53813
const UploadThingServerHelper = <const ValidRoutes,>(route: {
  readonly [Route in keyof ValidRoutes]: {
    middleware: () => ValidRoutes[Route];
    onUpload: (response: { metadata: ValidRoutes[Route] }) => void;
  };
}) => {};

const FileRouter = UploadThingServerHelper({
  example: {
    middleware: () => "someValue",
    onUpload: (response) => {
      const v: "someValue" = response.metadata;
    },
  },
});

function outer1<const T>(cb: () => T) {
  function inner1<const U>(cb2: () => U) {
    return [cb(), cb2()];
  }
  return inner1;
}
const nestedResult1 = outer1(() => 1)(() => "foo");

function outer2<T>(cb: () => T) {
  function inner2<const U>(cb2: () => U) {
    return [cb(), cb2()];
  }
  return inner2;
}
const nestedResult2 = outer2(() => 1)(() => "foo");

function outer3<const T>(cb: () => T) {
  function inner3<U>(cb2: () => U) {
    return [cb(), cb2()];
  }
  return inner3;
}
const nestedResult3 = outer3(() => 1)(() => "foo");

declare function overloaded1<const T>(cb: () => T): T;
declare function overloaded1<const T, const U>(cb: () => T, cb2: () => U): [T, U];
const overloadA = overloaded1(() => 42);
const overloadB = overloaded1(() => "hi", () => true);

declare function overloaded2<T>(cb: () => T): T;
declare function overloaded2<T, const U>(cb: () => T, cb2: () => U): [T, U];
const overloadC = overloaded2(() => 42);
const overloadD = overloaded2(() => "hi", () => true);

declare function overloaded3<const T>(cb: () => T): T;
declare function overloaded3<const T, U>(cb: () => T, cb2: () => U): [T, U];
const overloadE = overloaded3(() => 42);
const overloadF = overloaded3(() => "hi", () => true);

declare function overloaded4<const T>(cb: () => T): T;
declare function overloaded4<T, U>(cb: () => T, cb2: () => U): [T, U];
const overloadG = overloaded4(() => 42);
const overloadH = overloaded4(() => "hi", () => true);

declare function overloaded5<T>(cb: () => T): T;
declare function overloaded5<const T, U>(cb: () => T, cb2: () => U): [T, U];
const overloadI = overloaded5(() => 42);
const overloadJ = overloaded5(() => "hi", () => true);
