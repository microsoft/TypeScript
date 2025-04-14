//// [tests/cases/compiler/awaitedType.ts] ////

//// [awaitedType.ts]
type T1 = Awaited<number>;
type T2 = Awaited<Promise<number>>;
type T3 = Awaited<number | Promise<number>>;
type T4 = Awaited<number | Promise<string>>;
type T5 = Awaited<{ then: number }>;
type T6 = Awaited<{ then(): void }>; // never (non-promise "thenable")
type T7 = Awaited<{ then(x: number): void }>; // never (non-promise "thenable")
type T8 = Awaited<{ then(x: () => void): void }>; // unknown
type T9 = Awaited<any>;
type T10 = Awaited<never>;
type T11 = Awaited<unknown>;
type T12 = Awaited<Promise<Promise<number>>>;
type T13 = _Expect<Awaited<Promise<Promise<number>> | string | null>, /*expected*/ string | number | null>; // otherwise just prints T13 in types tests, which isn't very helpful
type T14 = _Expect<Awaited<Promise<Promise<number>> | string | undefined>, /*expected*/ string | number | undefined>; // otherwise just prints T14 in types tests, which isn't very helpful
type T15 = _Expect<Awaited<Promise<Promise<number>> | string | null | undefined>, /*expected*/ string | number | null | undefined>; // otherwise just prints T15 in types tests, which isn't very helpful

type TUndefined = Awaited<undefined>;
type TNull = Awaited<null>;
type TNullOrUndefined = Awaited<null | undefined>;

interface BadPromise { then(cb: (value: BadPromise) => void): void; }
type T16 = Awaited<BadPromise>; // error

interface BadPromise1 { then(cb: (value: BadPromise2) => void): void; }
interface BadPromise2 { then(cb: (value: BadPromise1) => void): void; }
type T17 = Awaited<BadPromise1>; // error

// https://github.com/microsoft/TypeScript/issues/46934
type T18 = Awaited<{ then(cb: (value: number, other: { }) => void)}>; // number

// https://github.com/microsoft/TypeScript/issues/33562
type MaybePromise<T> = T | Promise<T> | PromiseLike<T>
declare function MaybePromise<T>(value: T): MaybePromise<T>;

async function main() {
    let aaa: number;
    let bbb: string;
    [
        aaa,
        bbb,
    ] = await Promise.all([
        MaybePromise(1),
        MaybePromise('2'),
        MaybePromise(true),
    ])
}

// non-generic
async function f1(x: string) {
    // y: string
    const y = await x;
}

async function f2(x: unknown) {
    // y: unknown
    const y = await x;
}

async function f3(x: object) {
    // y: object
    const y = await x;
}

async function f4(x: Promise<string>) {
    // y: string
    const y = await x;
}

async function f5(x: Promise<unknown>) {
    // y: unknown
    const y = await x;
}

async function f6(x: Promise<object>) {
    // y: object
    const y = await x;
}

// generic

async function f7<T>(x: T) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.

    // y: Awaited<T>
    const y = await x;
}

async function f8<T extends any>(x: T) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.

    // y: Awaited<T>
    const y = await x;
}

async function f9<T extends unknown>(x: T) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.

    // y: Awaited<T>
    const y = await x;
}

async function f10<T extends {}>(x: T) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.

    // y: Awaited<T>
    const y = await x;
}

async function f11<T extends { then(onfulfilled: (value: unknown) => void): void }>(x: T) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.

    // y: Awaited<T>
    const y = await x;
}

async function f12<T extends string | object>(x: T) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.

    // y: Awaited<T>
    const y = await x;
}

async function f13<T extends string>(x: T) {
    // NOTE: T belongs to the domain of primitive types

    // y: T
    const y = await x;
}

async function f14<T extends { x: number }>(x: T) {
    // NOTE: T has a non-primitive base constraint without a callable `then`.

    // y: T
    const y = await x;
}

async function f15<T extends { then: number }>(x: T) {
    // NOTE: T has a non-primitive base constraint without a callable `then`.

    // y: T
    const y = await x;
}

async function f16<T extends number & { then(): void }>(x: T) {
    // NOTE: T belongs to the domain of primitive types (regardless of `then`)

    // y: T
    const y = await x;
}


// helps with tests where '.types' just prints out the type alias name
type _Expect<TActual extends TExpected, TExpected> = TActual;

// https://github.com/microsoft/TypeScript/issues/48320
async function f17<T extends (...args: any[]) => Promise<any>>(fn: T) {
    const ret: Awaited<ReturnType<T>> = await fn(1, 2, 3);
    return ret;
}
async function f17_usage() {
    const x = await f17(async () => 123 as const);
    return { x };
}

// https://github.com/microsoft/TypeScript/issues/47144
type GenericStructure<
  AcceptableKeyType extends string = string
> = Record<AcceptableKeyType, number>;

async function brokenExample<AcceptableKeyType extends string = string>(structurePromise: Promise<GenericStructure<AcceptableKeyType>>, key: AcceptableKeyType): Promise<void> {
  const structure = await structurePromise;
  structure[key] = 1;
}

// repro from #46543

type SelectAndInclude = {
  select: any;
  include: any;
};
type HasSelect = {
  select: any;
};
type HasInclude = {
  include: any;
};

type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? "Please either choose `select` or `include`"
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S;

declare function findMany<T extends { select?: string; include?: string }>(
  args: T
): CheckSelect<T, Promise<1>, Promise<2>>;

async function findManyWrapper<
  T extends { select?: string; include?: string }
>(args: T) {
  const result = await findMany(args);
  return result;
}

async function mainFindMany() {
  const shouldBeErrorText = await findManyWrapper({
    select: "foo",
    include: "bar",
  });
  const itsOne = await findManyWrapper({});
  const itsTwo1 = await findManyWrapper({ select: "foo" });
  const itsTwo2 = await findManyWrapper({ include: "bar" });
}

// repro from #41831

{
  const promises = [Promise.resolve(0)] as const

  Promise.all(promises).then((results) => {
    const first = results[0]
    const second = results[1] // error
  })
}

// repro from #40330

async function test40330() {

    const promiseNumber = Promise.resolve(1);
    const promiseVoid = async () => {}

    const res = await Promise.all([
        promiseNumber,
        ...[promiseVoid()]
    ])
}


//// [awaitedType.js]
async function main() {
    let aaa;
    let bbb;
    [
        aaa,
        bbb,
    ] = await Promise.all([
        MaybePromise(1),
        MaybePromise('2'),
        MaybePromise(true),
    ]);
}
// non-generic
async function f1(x) {
    // y: string
    const y = await x;
}
async function f2(x) {
    // y: unknown
    const y = await x;
}
async function f3(x) {
    // y: object
    const y = await x;
}
async function f4(x) {
    // y: string
    const y = await x;
}
async function f5(x) {
    // y: unknown
    const y = await x;
}
async function f6(x) {
    // y: object
    const y = await x;
}
// generic
async function f7(x) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.
    // y: Awaited<T>
    const y = await x;
}
async function f8(x) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.
    // y: Awaited<T>
    const y = await x;
}
async function f9(x) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.
    // y: Awaited<T>
    const y = await x;
}
async function f10(x) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.
    // y: Awaited<T>
    const y = await x;
}
async function f11(x) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.
    // y: Awaited<T>
    const y = await x;
}
async function f12(x) {
    // NOTE: T does not belong solely to the domain of primitive types and either does
    // not have a base constraint, its base constraint is `any`, `unknown`, `{}`, or `object`,
    // or it has a non-primitive base constraint with a callable `then`.
    // y: Awaited<T>
    const y = await x;
}
async function f13(x) {
    // NOTE: T belongs to the domain of primitive types
    // y: T
    const y = await x;
}
async function f14(x) {
    // NOTE: T has a non-primitive base constraint without a callable `then`.
    // y: T
    const y = await x;
}
async function f15(x) {
    // NOTE: T has a non-primitive base constraint without a callable `then`.
    // y: T
    const y = await x;
}
async function f16(x) {
    // NOTE: T belongs to the domain of primitive types (regardless of `then`)
    // y: T
    const y = await x;
}
// https://github.com/microsoft/TypeScript/issues/48320
async function f17(fn) {
    const ret = await fn(1, 2, 3);
    return ret;
}
async function f17_usage() {
    const x = await f17(async () => 123);
    return { x };
}
async function brokenExample(structurePromise, key) {
    const structure = await structurePromise;
    structure[key] = 1;
}
async function findManyWrapper(args) {
    const result = await findMany(args);
    return result;
}
async function mainFindMany() {
    const shouldBeErrorText = await findManyWrapper({
        select: "foo",
        include: "bar",
    });
    const itsOne = await findManyWrapper({});
    const itsTwo1 = await findManyWrapper({ select: "foo" });
    const itsTwo2 = await findManyWrapper({ include: "bar" });
}
// repro from #41831
{
    const promises = [Promise.resolve(0)];
    Promise.all(promises).then((results) => {
        const first = results[0];
        const second = results[1]; // error
    });
}
// repro from #40330
async function test40330() {
    const promiseNumber = Promise.resolve(1);
    const promiseVoid = async () => { };
    const res = await Promise.all([
        promiseNumber,
        ...[promiseVoid()]
    ]);
}
