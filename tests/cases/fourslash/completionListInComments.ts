/// <reference path='fourslash.ts' />

////var foo = '';
////( // f/**/

// Completion list should not be available within comments
verify.completions({ marker: "", exact: undefined });
