///<reference path="fourslash.ts" />

//// const a = { "foo.bar": 1}
//// a["[|foo.b/*0*/|]
//// a["[|foo.b           /*1*/|]
//// a[    "[|foo.b/*2*/|]
//// a["[|foo.b/*3*/|]"
//// a["[|foo./*4*/b|]

for (let i = 0; i < test.markers().length; i++) {
    verify.completions({
        marker: test.markers()[i],
        includes: [{
            "name": "foo.bar",
            "kind": "property",
            "kindModifiers": "",
            "replacementSpan": test.ranges()[i],
        }],
    });    
}
