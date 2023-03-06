/// <reference path='fourslash.ts' />

// Just testing that this doesn't cause an exception due to the @typedef contents not having '.parent' set.
// But it isn't bound to a Symbol so find-all-refs will return nothing.

/////** @typedef {Object} /*0*/T */
////function foo() {}

verify.baselineFindAllReferences('0')
