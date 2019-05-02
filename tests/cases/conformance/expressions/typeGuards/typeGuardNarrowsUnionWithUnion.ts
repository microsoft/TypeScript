// @strictNullChecks: true
declare let a: string | undefined;

declare function isEmptyStringOrUndefined(a: string | undefined): a is "" | undefined;
if (isEmptyStringOrUndefined(a)) {
  a; // "" | undefined
}

declare function isEmptyStringOrFoo(a: any): a is "" | "foo";
if (isEmptyStringOrFoo(a)) {
  a; // "" | "foo"
}

declare function isNumberOrBoolean(a: any): a is number | boolean;
if (isNumberOrBoolean(a)) {
  a; // never
}

declare let b: "" | undefined;

declare function isStringOrUndefined(b: any): b is string | undefined;
if (isStringOrUndefined(b)) {
  b; // "" | undefined
}

if (isNumberOrBoolean(b)) {
  b; // never
}

type A = { a: unknown };
type B = { b: unknown };
declare let c: { a: string } | { z: number };

declare function isAorB(c: any): c is A | B;
if (isAorB(c)) {
  c; // { a: string }
}

declare let d: A | B;

declare function hasStringPropertyAOrIsBOrUndefined(d: any): d is { a: string } | B | undefined;
if (hasStringPropertyAOrIsBOrUndefined(d)) {
  d; // { a: string } | B
}
