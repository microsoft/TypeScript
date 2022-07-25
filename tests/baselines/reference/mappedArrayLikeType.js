//// [mappedArrayLikeType.ts]
type Tuple<T> = [T, ...string[], T];
type ReadonlyTuple<T> = readonly [T, ...string[], T];

type Mapper<T extends readonly any[]> = { [P in keyof T]: `${P}_${T[P]}` };

type A = string[] & { foo };
type AMapped = Mapper<A>;

type RA = readonly string[] & { foo };
type RAMapped = Mapper<RA>;

type T = [number, ...string[], number] & { foo };
type TMapped = Mapper<T>;

type RT = readonly [number, ...string[], number] & { foo };
type RTMapped = Mapper<RT>;

interface AX<T> extends AY<T> {
  0: T & {};
  length: 1;
  foo: Mapper<this>;
}
interface AY<T> extends AZ<T> { bar }
interface AZ<T> extends Array<T> { baz }

interface RAX<T> extends RAY<T>  {
  0: T & {};
  length: 1;
  foo: Mapper<this>;
}
interface RAY<T> extends RAZ<T> { bar }
interface RAZ<T> extends ReadonlyArray<T> { baz }

interface TX<T> extends TY<T>  {
  0: T & {};
  foo: Mapper<this>;
}
interface TY<T> extends TZ<T> { bar }
interface TZ<T> extends Tuple<T> { baz }

interface RTX<T> extends RTY<T>  {
  0: T & {};
  foo: Mapper<this>;
}
interface RTY<T> extends RTZ<T> { bar }
interface RTZ<T> extends ReadonlyTuple<T> { baz }


//// [mappedArrayLikeType.js]
