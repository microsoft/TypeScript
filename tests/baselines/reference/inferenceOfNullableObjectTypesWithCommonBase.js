//// [tests/cases/compiler/inferenceOfNullableObjectTypesWithCommonBase.ts] ////

//// [inferenceOfNullableObjectTypesWithCommonBase.ts]
function equal<T>(a: T, b: T) { }

let v = null!;

// Object types with common base types

type B = { foo: string }
type D = { foo: string; bar: number }

equal(v as B, v as undefined | D)
equal(v as undefined | D, v as B)

equal<undefined | B>(v as B, v as undefined | D)
equal<undefined | B>(v as undefined | D, v as B)

equal(v as B, v as undefined)
equal(v as undefined, v as B)

equal(v as B, v as D)
equal(v as D, v as B)

equal(v as B, v as B | undefined)
equal(v as B | undefined, v as B)

equal(v as 'a' | undefined, v as 'b');
equal(v as 'a', v as 'b' | undefined);

equal(v as 'a' | undefined, v as 'b' | null);
equal(v as 'a' | null, v as 'b' | undefined);

equal(v as string, v as string & { tag: 'foo' } | undefined);
equal(v as string & { tag: 'foo' } | undefined, v as string);


//// [inferenceOfNullableObjectTypesWithCommonBase.js]
"use strict";
function equal(a, b) { }
var v = null;
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
equal(v, v);
