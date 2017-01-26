/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////class [|{| "isWriteAccess": true, "isDefinition": true |}A|] {
////}
////export = [|A|];

// @Filename: b.ts
////export import [|{| "isWriteAccess": true, "isDefinition": true |}b|] = require('./a');

// @Filename: c.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}b|] = require('./b');
////var a = new [|b|]./**/[|b|]();

goTo.marker();
verify.quickInfoExists();
verify.noErrors();

const [a0, a1, b0, c0, c1, c2] = test.ranges();
const aRanges = [a0, a1];
const bRanges = [b0, c2];
const cRanges = [c0, c1];

const bGroup = { definition: "import b = require('./a')", ranges: bRanges }

verify.referenceGroups(aRanges, [
    { definition: "class A", ranges: aRanges },
    bGroup
]);
verify.referenceGroups(b0, [bGroup]);
verify.referenceGroups(c2, [{ ...bGroup, definition: "(alias) new b.b(): b.b\nimport b.b = require('./a')"}]);
verify.singleReferenceGroup("import b = require('./b')", cRanges);

verify.rangesAreRenameLocations(aRanges);
verify.rangesAreRenameLocations(bRanges);
verify.rangesAreRenameLocations(cRanges);
