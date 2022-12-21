/// <reference path='fourslash.ts'/>

////let x: { [_ in "foo"]: string } = {
////    "[|/**/|]"
////}

verify.completions({
    marker: "",
    exact: [
        { name: "foo", replacementSpan: test.ranges()[0] }
    ]
});
