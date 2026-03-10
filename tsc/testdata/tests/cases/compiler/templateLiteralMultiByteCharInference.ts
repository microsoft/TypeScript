// @strict: true
// @noEmit: true

// Verifies that template literal type inference handles multi-byte characters correctly,
// slicing by Unicode code point (rune) instead of by byte.

type GetFirst<S extends string> = S extends `${infer Head}${string}` ? Head : never;
type GetRest<S extends string> = S extends `${string}${infer Rest}` ? Rest : never;
type Split<S extends string> = S extends `${infer Head}${infer Rest}` ? [Head, Rest] : never;

// Single-byte (ASCII) characters
type A = GetFirst<"ABC">;  // "A"
type BC = GetRest<"ABC">;  // "BC"
type ABC_Split = Split<"ABC">;  // ["A", "BC"]

// Multi-byte characters (Japanese, 3 bytes in UTF-8, 1 code unit in UTF-16)
type Ah = GetFirst<"あいう">;  // "あ"
type IU = GetRest<"あいう">;  // "いう"
type AIU_Split = Split<"あいう">;  // ["あ", "いう"]

// Mixed single-byte and multi-byte
type M1 = GetFirst<"aあ">;  // "a"
type M2 = GetFirst<"あa">;  // "あ"

// 2-byte UTF-8 characters (Latin Extended, 1 code unit in UTF-16)
type E = GetFirst<"éàü">;  // "é"

// Emoji (4 bytes in UTF-8, 2 code units in UTF-16 as surrogate pair)
type Emoji = GetFirst<"😀abc">;

// Verification
type Expect<T, Expected> = T extends Expected ? true : false;
const check1: Expect<A, "A"> = true;
const check2: Expect<Ah, "あ"> = true;
const check3: Expect<BC, "BC"> = true;
const check4: Expect<IU, "いう"> = true;
const check5: Expect<M1, "a"> = true;
const check6: Expect<M2, "あ"> = true;
const check7: Expect<E, "é"> = true;
