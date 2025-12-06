// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62717

type Alias1<T extends object, U extends { [K in keyof T]?: any }> = U;
type Alias2<T extends object, U extends Partial<Record<keyof T, any>>> = U;

type AB = { a: string; b: string };
type B = { b: string };

type Test1 = Alias1<AB, B>; // ok
type Test2 = Alias2<AB, B>; // ok

type Test3<T extends AB> = Alias1<T, B>; // ok
type Test4<T extends AB> = Alias2<T, B>; // ok

type WithNumber<T> = { [K in keyof T]: T[K] | number };
type Alias3<T extends object, U extends WithNumber<Record<keyof T, any>>> = U;

type ABC = { a: string; b: string; c: string };

type Test5 = Alias3<AB, ABC>; // ok
type Test6<T extends AB> = Alias3<T, ABC>; // error

type Alias4<T extends object, U extends WithNumber<Partial<Record<keyof T, any>>>> = U;

type Test7 = Alias4<AB, ABC>; // ok
type Test8<T extends AB> = Alias4<T, ABC>; // ok

type Alias5<T extends object, U extends Partial<WithNumber<Record<keyof T, any>>>> = U;

type Test9 = Alias5<AB, ABC>; // ok
type Test10<T extends AB> = Alias5<T, ABC>; // ok

// part of https://github.com/microsoft/TypeScript/issues/62770

interface WithCommon {
  field1: number;
  field2: string;
}

interface WithSpecial extends WithCommon {
  special: number;
}

interface SpecialLookup {
  special: WithSpecial;
}

interface CommonLookup extends SpecialLookup {
  common: WithCommon;
}

type Lookup<Name extends keyof CommonLookup> = {
  [K in keyof CommonLookup[Name]]?: CommonLookup[Name][K];
};
function someName<K extends keyof SpecialLookup>(): void {
  // ok
  const works1: Lookup<"special"> = {
    field1: 1,
    field2: "common",
    special: 203,
  };

  // error
  const works2: Lookup<"common"> = {
    field1: 5,
    field2: "something",
    special: 32, 
  };

  // ok
  const works3: Lookup<K> = {
    special: undefined,
    field1: undefined,
    field2: undefined,
  };

  // error
  const works4: Lookup<K> = {
    field1: undefined,
    field2: undefined,
    special: 32,
  };
}

export {};
