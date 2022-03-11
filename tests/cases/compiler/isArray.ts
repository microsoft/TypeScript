// @target: es2015
/// @errors: 2322 4104

// https://github.com/microsoft/TypeScript/issues/17002
// Preserves mutability, false branch removes arrays, mutable or not

declare const mutable: string | string[];
if (Array.isArray(mutable)) {
  const stillMutable: string[] = mutable;
} else {
  const narrowed: string = mutable;
}

declare const immutable: string | readonly string[];
if (Array.isArray(immutable)) {
  const notMutable: string[] = immutable; // Should fail: readonly string[] isn't assignable to string[]
} else {
  const narrowed: string = immutable;
}

// https://github.com/microsoft/TypeScript/issues/33700
// Preserves element or iterated type of wider types

declare const arrayLike: string | ArrayLike<string>;
if (Array.isArray(arrayLike)) {
  const arrayOfElementType: readonly string[] = arrayLike;
  const notArrayOfAny: readonly void[] = arrayLike; // Should fail: string isn't assignable to void
}

declare const iterable: string | Iterable<string>;
if (Array.isArray(iterable)) {
  const arrayOfIteratedType: readonly string[] = iterable;
  const notArrayOfAny: readonly void[] = iterable; // Should fail: string isn't assignable to void
}

// https://github.com/microsoft/TypeScript/pull/42316#discussion_r823218462
// any and unknown backward compatibility

declare const any: any;
if (Array.isArray(any)) {
  const mutableArrayOfAny: void[] = any;
  const notAny: void = any; // Should fail: any[] isn't assignable to void
}

declare const unknown: unknown;
if (Array.isArray(unknown)) {
  const mutableArrayOfAny: void[] = unknown;
  const notAny: void = unknown; // Should fail: any[] isn't assignable to void
}
