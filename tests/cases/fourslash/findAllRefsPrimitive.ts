// @noLib: true

/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////const x: /*1*/[|any|] = 0;
////const any = 2;
////const y: /*2*/[|any|] = any;

////function f(b: /*3*/[|boolean|]): /*4*/[|boolean|];

////type T = /*5*/[|never|]; type U = /*6*/[|never|];

////function n(x: /*7*/[|number|]): /*8*/[|number|];

////function o(x: /*9*/[|object|]): /*10*/[|object|];

////function s(x: /*11*/[|string|]): /*12*/[|string|];

////function sy(s: /*13*/[|symbol|]): /*14*/[|symbol|];

////function v(v: /*15*/[|void|]): /*16*/[|void|];

// @Filename: b.ts
//// const z: /*17*/[|any|] = 0;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17');
verify.baselineDocumentHighlights(undefined, { filesToSearch: ["a.ts", "b.ts"] });
goTo.rangeStart(test.ranges()[0]);
verify.renameInfoFailed();
