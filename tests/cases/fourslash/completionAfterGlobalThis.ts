/// <reference path='fourslash.ts'/>

////globalThis./**/

// TODO: This is right except for globalThis and undefined
verify.completions({ marker: "", exact: completion.globalsVars });
