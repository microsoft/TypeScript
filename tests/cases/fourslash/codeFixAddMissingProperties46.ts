/// <reference path='fourslash.ts' />

// @strict: true

//// type T = { t: string };
//// declare function f(arg?: T): void;
//// f([|{}|]);

verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent:
`{
    t: ""
}`,
});
