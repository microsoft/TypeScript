// @strict: true
// @noEmit: true

declare function A<T>(value: T): T extends string ? T : never;

const ATest = A("foo");

declare function B<T>(value: T): `test_${T & string}`;

const BTest = B("foo");

declare function C<T>(
  value: T,
): T extends string
  ? T
  : T extends number | bigint | boolean | null | undefined
  ? `test_${T}`
  : never;

const CTest = C("foo");

declare function D<T>(value: T): T extends number ? `test_${T}` : T;

const DTest = D("foo");

declare function E<T>(value: T): T extends string ? `test_${T}` : T;

const ETest = E("foo");

declare function F<T>(value: T): T extends number ? `test_${T}` : [T];

const FTest1 = F("foo");
const FTest2 = F(42);

declare function G<T>(value: T): T extends string ? `test_${T}` : [T];

const GTest1 = G("foo");
const GTest2 = G(42);

declare function H<T>(
  value: T,
): T extends number ? never : `test_${T & string}`;

const HTest = H("foo");
