//// [tests/cases/compiler/unparenthesizedConstructorTypeInUnionOrIntersection.ts] ////

//// [unparenthesizedConstructorTypeInUnionOrIntersection.ts]
type U1 = string | new () => void;
type U2 = string | new (foo: number) => void
type U3 = | new () => number
type U4 = | new (foo?: number) => void;
type U5 = string | new (number: number, foo?: string) => void | number;
type U6 =
  | string
  | new (...args: any[]) => void
  | number;

type I1 = string & new () => void;
type I2 = string & new (...foo: number[]) => void;
type I3 = & new () => boolean
type I4 = & new () => boolean & null;
type I5 = string & new (any: any, any2: any) => any & any;
type I6 =
  & string
  & new (foo: any) => void;

type M1 = string | number & string | new () => number;
type M2 = any & string | any & new () => void;
type M3 = any & new (foo: any) => void | new () => void & any;

type OK1 = string | (new ()=> void);
type OK2 = string | (new ()=> string | number);


//// [unparenthesizedConstructorTypeInUnionOrIntersection.js]
