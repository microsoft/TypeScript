/// <reference path='fourslash.ts' />

// @strict: true

//// abstract class A { abstract a (); }
////
//// class TT { constructor () {} }
////
//// class AT extends A { a () {} }
////
//// class Foo {}
////
//// class T {
////
////     a: boolean;
////
////     static b: boolean;
////
////     private c: boolean;
////
////     d: number | undefined;
////
////     e: string | boolean;
////
////     f: 1;
////
////     g: "123" | "456";
////
////     h: boolean;
////
////     i: TT;
////
////     j: A;
////
////     k: AT;
////
////     l: Foo;
//// }

function fixes(name: string, type: string, options: { isPrivate?: boolean, noInitializer?: boolean } = {}) {
    return [
        `Add 'undefined' type to property '${name}'`,
        `Add definite assignment assertion to property '${options.isPrivate ? "private " : ""}${name}: ${type};'`,
        ...(options.noInitializer ? [] : [`Add initializer to property '${name}'`]),
    ].map(description => ({ description }));
}

verify.codeFixAvailable([
    ...fixes("a", "boolean"),
    ...fixes("c", "boolean", { isPrivate: true }),
    ...fixes("e", "string | boolean"),
    ...fixes("f", "1"),
    ...fixes("g", '"123" | "456"'),
    ...fixes("h", "boolean"),
    ...fixes("i", "TT"),
    ...fixes("j", "A", { noInitializer: true }),
    ...fixes("k", "AT"),
    ...fixes("l", "Foo"),
    { description: "Remove declaration for: 'c'" },
]);
