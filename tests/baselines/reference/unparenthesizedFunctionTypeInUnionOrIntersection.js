//// [unparenthesizedFunctionTypeInUnionOrIntersection.ts]
type U1 = string | () => void;
type U2 = string | (foo: number) => void
type U3 = | () => number
type U4 = | (foo?: number) => void;
type U5 = string | (number: number, foo?: string) => void | number;
type U6 =
  | string
  | (...args: any[]) => void
  | number;

type I1 = string & () => void;
type I2 = string & (...foo: number[]) => void;
type I3 = & () => boolean
type I4 = & () => boolean & null;
type I5 = string & (any: any, any2: any) => any & any;
type I6 =
  & string
  & (foo: any) => void;

type M1 = string | number & string | () => number;
type M2 = any & string | any & () => void;
type M3 = any & (foo: any) => void | () => void & any;

type OK1 = string | (number);
type OK2 = string | ((number));
type OK3 = string | (()=> void);
type OK4 = string | (()=> string | number);


//// [unparenthesizedFunctionTypeInUnionOrIntersection.js]
