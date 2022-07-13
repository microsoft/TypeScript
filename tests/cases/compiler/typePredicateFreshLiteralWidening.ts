// @strictNullChecks: true

type Narrowable = string | number | bigint | boolean;

type Narrow<A> = (A extends Narrowable ? A : never) | ({
    [K in keyof A]: Narrow<A[K]>;
});

const satisfies =
  <TWide,>() =>
  <TNarrow extends TWide>(narrow: Narrow<TNarrow>) =>
    narrow;

/* ========================================================================== */

const isNotNull = <T,>(value: T | null): value is T => value !== null;

type Item = { value: string | null };

const item1 = satisfies<Item>()({ value: "1" });
const item2 = satisfies<Item>()({ value: "2" });
const item3 = satisfies<Item>()({ value: null });

const values2: Array<"1" | "2" | null> = ["1", "2", null];
const filteredValues2 = values2.filter(isNotNull);

const values1 = [item1, item2, item3].map(item => item.value);
const filteredValues1 = values1.filter(isNotNull);
