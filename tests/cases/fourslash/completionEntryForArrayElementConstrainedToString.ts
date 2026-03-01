/// <reference path="fourslash.ts" />

//// declare function test<T extends 'a' | 'b'>(a: { foo: T[] }): void
////
//// test({ foo: [/*ts*/] })

verify.completions({ marker: ["ts"], includes: ['"a"', '"b"'], isNewIdentifierLocation: true });
