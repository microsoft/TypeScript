type NamedAndAnonymous = [a: string, number];

function fa1(...args: NamedAndAnonymous) {}
function fa2(a: NamedAndAnonymous, ...args: NamedAndAnonymous) {}

type NamedAnonymousMixed = [a: string, number, c: number, NamedAndAnonymous];

function fb1(...args: NamedAnonymousMixed) {}
function fb2(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed) {}
function fb3(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed[3]) {}

type ToAnonymousTuple<T extends unknown[]> = {
  [K in keyof T]: [K, T[K], keyof T, T];
};

type AnonymousToAnonymous = ToAnonymousTuple<[boolean, number]>;
type MixedToAnonymous = ToAnonymousTuple<[boolean, second: number]>;
type NamedToAnonymous = ToAnonymousTuple<[first: boolean, second: number]>;

type ToMixedTuple<T extends unknown[]> = {
  [K in keyof T]: [K, second: T[K], keyof T, fourth: T];
};

type AnonymousToMixed = ToMixedTuple<[boolean, number]>;
type MixedToMixed = ToMixedTuple<[boolean, second: number]>;
type NamedToMixed = ToMixedTuple<[first: boolean, second: number]>;

type MixedSpread = [first: boolean, ...[second: string]];

type ConditionalTuple = [
  first: boolean,
  ...(0 extends 0 ? [second: string] : [])
];

type AddMixedConditional<T> = [
  first: boolean,
  null,
  third: T extends number ? "a" : "b",
  ...(T extends 0 ? [fourth: "c"] : [])
];

type AddMixedConditionalBoolean = AddMixedConditional<boolean>;
type AddMixedConditionalLiteral = AddMixedConditional<0>;
type AddMixedConditionalNumberPrimitive = AddMixedConditional<number>;

declare function test<T extends readonly unknown[]>(
  arg: [
    ...{
      [K in keyof T]: {
        type: T[K];
      };
    }
  ]
): T;

declare const input: [first: { type: number }, { type: string }];

const output = test(input);
