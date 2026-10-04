// @strict: true
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63291

type WithObject1 = Required<{ a?: string | undefined }>;
const obj1: WithObject1 = { a: undefined };
type WithArray1 = Required<[(string | undefined)?]>;
const tup1: WithArray1 = [undefined];

type ToStringOrUnd<T> = { [P in keyof T]-?: string | undefined };

type WithObject2 = ToStringOrUnd<{ a: 1; b?: 2 }>;
const obj2: WithObject2 = { a: "1", b: undefined };
type WithArray2 = ToStringOrUnd<[1, 2?]>;
const tup2: WithArray2 = ["1", undefined];
