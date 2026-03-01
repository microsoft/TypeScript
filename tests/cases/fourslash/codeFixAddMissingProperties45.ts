/// <reference path='fourslash.ts' />

// @strict: true

//// type U = { u?: { v: string } };
//// const u: U = { [|u: {}|] };

verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent:
`u: {
    v: ""
}`,
});
