// @strict: true
// @noEmit: true

declare const untyped: (Function & { tag: string }) | (() => string);
const result = untyped();

declare const primitive: (string & Function) | (() => string);
const primitiveResult = primitive();

declare const typed: (Function & ((value: number) => number)) | ((value: number) => string);
const typedResult: number | string = typed(1);
typed("wrong");

declare const incompatible: ((value: number) => void) | ((value: string) => void);
incompatible(1);

declare const nonCallable: { tag: string } | (() => void);
nonCallable();

declare const constructor: (Function & (new () => object)) | (() => void);
constructor();