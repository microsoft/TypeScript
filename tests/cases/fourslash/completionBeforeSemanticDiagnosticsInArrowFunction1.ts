/// <reference path='fourslash.ts' />

//// var f4 = <T>(x: T/**/ ) => {
//// }

goTo.marker();

// Replace the "T" type with the non-existent type 'V'.
edit.backspace(1);
edit.insert("A");

// Bring up completion to force a pull resolve.  This will end up resolving several symbols and
// producing unreported diagnostics (i.e. that 'V' wasn't found).
verify.completions({ includes: { name: "T", text: "(type parameter) T in <T>(x: A): void" } });

// There should now be a single error.
verify.numberOfErrorsInCurrentFile(1);
