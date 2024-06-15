///<reference path="fourslash.ts" />

// @Filename: file0.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo.b/*0*/|]

// @Filename: file1.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo.b           /*1*/|]

// @Filename: file2.ts
//// const a = { "foo.bar": 1 }
//// a[    "[|foo.b/*2*/|]

// @Filename: file3.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo.b/*3*/|]"

// @Filename: file4.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo./*4*/|]b

// @Filename: file5.ts
//// const a = { "foo.bar": 1 }
//// a['[|foo./*5*/|]b

// @Filename: file6.ts
//// const a = { "foo.bar": 1 }
//// a[`[|foo./*6*/|]b

// @Filename: file7.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo./*7*/|]

// @Filename: file8.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo/*8*/|]

// @Filename: file9.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo./*9*/|]"

// @Filename: file10.ts
//// const a = { "foo.bar": 1 }
//// a["[|foo/*10*/|]"

// @Filename: file11.ts
//// const a = { "foo.bar": 1 }
//// a["[|f/*11*/|]oo.b

// @Filename: file12.ts
//// const a = { "foo.bar": 1 }
//// a["[|f/*12*/oo.b|]"

// @Filename: file13.ts
//// const a = { "foo.bar": 1 }
//// a["[|f/*13*/oo.b|]" // some comment!!

// @Filename: file14.ts
//// const a = { "foo.bar": 1 }
//// a["[|f/*14*/|]oo.b // some comment!!

// @Filename: file15.ts
//// const a = { "foo.bar": 1 }
//// a[`[|foo.b/*15*/|]

// @Filename: empty1.ts
//// const a = { "foo.bar": 1 }
//// a[`/*a*/

// @Filename: empty2.ts
//// const a = { "foo.bar": 1 }
//// a["/*b*/

// @Filename: empty3.ts
//// const a = { "foo.bar": 1 }
//// a['/*c*/

// tests a,b,c should return no replacementSpan
const markers = test.markers();
const ranges = test.ranges();

for (let i = 0; i < markers.length; i++) {
    verify.completions({
        marker: markers[i],
        includes: [{
            "name": "foo.bar",
            "kind": "property",
            "kindModifiers": "",
            "replacementSpan": ranges[i],
        }],
    });    
}
