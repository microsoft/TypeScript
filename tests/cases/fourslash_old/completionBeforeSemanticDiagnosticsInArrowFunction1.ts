/// <reference path='fourslash.ts' />

//// var f4 = <T>(x: T/**/ ) => {
//// }

// Turn off edit validation.  We don't want semantic diagnostics to run until  we explicit call it.
fs.diagnostics.setEditValidation(IncrementalEditValidation.None);

fs.goTo.marker();

// Replace the "T" type with the non-existent type 'V'.
fs.edit.backspace(1);
fs.edit.insert("A");

// Bring up completion to force a pull resolve.  This will end up resolving several symbols and
// producing unreported diagnostics (i.e. that 'V' wasn't found).
fs.verify.completionListContains("T");
fs.verify.completionEntryDetailIs("T", "T");

// There should now be a single error.
fs.verify.numberOfErrorsInCurrentFile(1);