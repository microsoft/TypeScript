/// <reference path='fourslash.ts' />

////interface I {
////    a(): void;
////    b(x: 'x', y: 'a' | 'b'): 'b';
////
////    c: 'c';
////    d: { e: 'e'; };
////}
////class Foo implements I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_interface_0.message, "I"],
    index: 0,
    newFileContent:
`interface I {
    a(): void;
    b(x: 'x', y: 'a' | 'b'): 'b';

    c: 'c';
    d: { e: 'e'; };
}
class Foo implements I {
    a(): void {
        throw new Error('Method not implemented.');
    }
    b(x: 'x', y: 'a' | 'b'): 'b' {
        throw new Error('Method not implemented.');
    }
    c: 'c';
    d: { e: 'e'; };
}`,
    preferences: { quotePreference: "single" }
});
