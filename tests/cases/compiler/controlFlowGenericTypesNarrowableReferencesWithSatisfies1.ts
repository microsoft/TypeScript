// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/52394

const foo52394 = <T extends 1 | 2>(bar: T) => {
  const a = bar satisfies any;
  return a;
};

type MyType52394 = {
  a: string;
  b: "a" | "b" | "c" | "d" | "e";
};
const foo2_52394 = <T extends "a" | "b" | "c">(bar: T) =>
  ({
    a: bar,
    b: bar,
  }) satisfies MyType52394;

type BoxState = "open" | "closed";

type Box = {
  boxState: BoxState;
  boxedObject: unknown;
};

function boxFactorySafe<BS extends BoxState>(
  boxState: BS,
  boxedObject: unknown,
) {
  return {
    boxState,
    boxedObject,
  } as const satisfies Box;
}

const safeBoxedObject = boxFactorySafe("open", "some value");

// https://github.com/microsoft/TypeScript/issues/60698

type Table = "block" | "collection" | "space";

type RecordPointer<T extends Table> = {
  [T_ in T]: {
    id: string;
    table: T_;
  };
}[T];

function g<T extends Table>(t: T): RecordPointer<Table> {
  const x = { table: t, id: "foo" } as const satisfies RecordPointer<Table>;
  return x; // error
}

export function bounceAndTakeIfA<AB extends "A" | "B">(value: AB) {
  if (value === "A") {
    const temp = value satisfies "A"
    const takeA: "A" = value satisfies "A";
  }
}
