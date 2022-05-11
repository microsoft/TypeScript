//// [arrayValueStrict.ts]
type TNever1 = ArrayValue<number>;
type TNever2 = ArrayValue<string>;
type TNever3 = ArrayValue<Promise<boolean>>;
type TNever4 = ArrayValue<void>;

type TValuePrimitive1 = ArrayValue<Array<number>>;
type TValuePrimitive2 = ArrayValue<Array<string>>;
type TValuePrimitive3 = ArrayValue<Array<boolean>>;

type TValueWithUndefined = ArrayValue<Array<string | undefined>>;

type TValueWithObject = ArrayValue<Array<{
  foo: string;
  bar: number;
}>>;

type TValueWithNestedArrays = ArrayValue<Array<Array<string>>>;

type TValueReadonlyPrimitive1 = ArrayValue<ReadonlyArray<number>>;
type TValueReadonlyPrimitive2 = ArrayValue<ReadonlyArray<string>>;
type TValueReadonlyPrimitive3 = ArrayValue<ReadonlyArray<boolean>>;

type TValueReadonlyWithUndefined = ArrayValue<ReadonlyArray<string | undefined>>;


//// [arrayValueStrict.js]
