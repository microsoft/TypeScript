/// <reference path="fourslash.ts" />

/////*d*/export default { [|/*a*/case|] };
////[|/*b*/default|];
////[|/*c*/case|] 42;

verify.goToDefinition("a", "a");
verify.goToDefinition("b", "d");
verify.goToDefinition("c", []);
