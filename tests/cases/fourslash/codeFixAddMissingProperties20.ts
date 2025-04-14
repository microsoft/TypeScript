/// <reference path='fourslash.ts' />

////type T = { foo: number };
////const foo: T[] = [];
////[|foo.push({  })|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`foo.push({
    foo: 0
})`,
});
