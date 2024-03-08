// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/53359#issuecomment-1475390594

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type EnumValues = [string, ...string[]];
type Values<T extends EnumValues> = { [k in T[number]]: k; };

declare class ZodEnum<T extends [string, ...string[]]> {
  get enum(): Values<T>
}

declare function createZodEnum<U extends string, T extends Readonly<[U, ...U[]]>>(values: T): ZodEnum<Writeable<T>>;

// https://github.com/microsoft/TypeScript/issues/53359#issuecomment-1475390607

type Maybe<T> = T | null | undefined;
type AnyTuple = [unknown, ...unknown[]];
type AnyObject = { [k: string]: any };
type Flags = "s" | "d" | "";

interface ISchema<T, C = any, F extends Flags = any, D = any> {
  __flags: F;
  __context: C;
  __outputType: T;
  __default: D;
}

declare class TupleSchema<
  TType extends Maybe<AnyTuple> = AnyTuple | undefined,
  TContext = AnyObject,
  TDefault = undefined,
  TFlags extends Flags = ""
> {
  constructor(schemas: [ISchema<any>, ...ISchema<any>[]]);
}

export function create<T extends AnyTuple>(schemas: {
  [K in keyof T]: ISchema<T[K]>;
}) {
  return new TupleSchema<T | undefined>(schemas);
}
