// @strict: true
// @noEmit: true

declare function isNotNullish(value: unknown): value is {};
declare function isNullish(value: unknown): value is null | undefined;

declare const value1: unknown;
if (isNotNullish(value1)) {
  value1;
}

declare const value2: unknown;
if (!isNotNullish(value2)) {
  value2;
}

declare const value3: unknown;
if (isNullish(value3)) {
  value3;
}

declare const value4: unknown;
if (!isNullish(value4)) {
  value4;
}

declare class A { foo: string; }
declare function isA(value: unknown): value is A;

declare const value5: unknown;
if (isA(value5)) {
  value5;
}

declare const value6: unknown;
if (!isA(value6)) {
  value6;
}
