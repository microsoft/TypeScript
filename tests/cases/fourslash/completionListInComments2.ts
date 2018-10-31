/// <reference path='fourslash.ts' />

//// // */{| "name" : "1" |}

// Completion list should not be available within comments
verify.completions({ marker: "1", exact: undefined });
