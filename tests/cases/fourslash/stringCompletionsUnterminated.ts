///<reference path="fourslash.ts" />

// @Filename: file1.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo.b/*0*/|]
//// a["[|foo.b           /*1*/|]
//// a[    "[|foo.b/*2*/|]
//// a["[|foo.b/*3*/|]"
//// a["[|foo./*4*/b|]
//// a['[|foo./*5*/b|]
//// a[`[|foo./*6*/b|]

// @Filename: file2.ts
//// const a = { "foo.bar": 1 }
//// a[`/*7*/

// @Filename: file3.ts
//// const a = { "foo.bar": 1 }
//// a["/*8*/

// @Filename: file4.ts
//// const a = { "foo.bar": 1 }
//// a['/*9*/

// tests 7-9 should return no replacementSpan
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
