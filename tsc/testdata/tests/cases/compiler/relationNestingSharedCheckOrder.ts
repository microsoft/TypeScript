// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

// Relating S<string> to R<string> fresh is cut short at deeply nested
// types before reaching next.leaf, and so succeeds. In program order Inner
// has already found that S<[string]> is not related to R<[string]>. Whether
// Outer succeeds must not depend on which comes first. Conditional types
// relate without reporting errors, which would compute the comparison again.

type S<T> = { next: S<[T]>; leaf: T extends [[unknown]] ? number : T };
type R<T> = { next: R<[T]>; leaf: T };

type Inner = S<[string]> extends R<[string]> ? true : false;
type Outer = S<string> extends R<string> ? true : false;
