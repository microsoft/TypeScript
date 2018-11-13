/// <reference path='fourslash.ts' />

////interface I {
////    m(): void;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I {
    m(): void;
}
class C implements I {
    m(): void {
        throw new Error('Method not implemented.');
    }
}`,
    preferences: { quotePreference: "single" }
});
