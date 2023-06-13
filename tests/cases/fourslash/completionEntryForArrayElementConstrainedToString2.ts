/// <reference path="fourslash.ts" />

//// declare function test<T extends 'a' | 'b'>(a: { foo: T[] }): void
////
//// test({ foo: ['a', /*ts*/] })

verify.completions({ marker: ["ts"], includes: ['"a"', '"b"'], isNewIdentifierLocation: true });
