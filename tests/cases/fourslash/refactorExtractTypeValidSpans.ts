/// <reference path='fourslash.ts' />

//// var x: /*1a*/{ a?:/*2a*/ number, b?: string/*2b*//*3a*//*3b*/ }/*1b*/ = { };

// Only offer refactor for empty span if explicity requested
goTo.select("3a", "3b");
verify.refactorNotAvailableForTriggerReason("implicit", "Extract type");

for (const m of ["1", "2", "3"]) {
    goTo.select(m + "a", m + "b");
    verify.refactorAvailableForTriggerReason("invoked", "Extract type");
}
