/// <reference path='fourslash.ts' />

////interface IFoo {
////    a: 'string';
////    c: { d: 'string'; };
////}
////class Foo implements IFoo {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_interface_0.message, "IFoo"],
    newFileContent:
`interface IFoo {
    a: 'string';
    c: { d: 'string'; };
}
class Foo implements IFoo {
    a: 'string';
    c: { d: 'string'; };
}`,
    preferences: { quotePreference: "single" }
});
