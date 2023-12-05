/// <reference path="fourslash.ts" />

////export default { [|/*a*/case|] };
////[|/*b*/default|];
////[|/*c*/case|] 42;

verify.baselineGoToDefinition("a", "b", "c");
