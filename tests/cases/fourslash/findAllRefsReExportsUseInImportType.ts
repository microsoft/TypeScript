/// <reference path="fourslash.ts" />

// @Filename: /foo/types/types.ts
////[|export type [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Full|] = { prop: string; };|]

// @Filename: /foo/types/index.ts
////[|import * as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}foo|] from './types';|]
////[|export { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}foo|] };|]

// @Filename: /app.ts
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}foo|] } from './foo/types';|]
////export type fullType = [|foo|].[|Full|];
////type namespaceImport = typeof import('./foo/types');
////type fullType2 = import('./foo/types').[|foo|].[|Full|];

verify.noErrors();
const [full0Def, full0, foo0Def, foo0, foo1Def, foo1, foo2Def, foo2, foo3, full1, foo4, full2] = test.ranges();
const fullRanges = [full0, full1, full2];
const full = {
    definition: "type Full = {\n    prop: string;\n}",
    ranges: fullRanges
};
verify.referenceGroups(fullRanges, [full]);
verify.renameLocations(fullRanges, fullRanges);

const fooTypesRanges = [foo0, foo1];
const fooTypes = {
    definition: "import foo",
    ranges: fooTypesRanges
};
const fooAppRanges = [foo2, foo3];
const fooApp = {
    definition: "import foo",
    ranges: fooAppRanges
};
const exportFooRanges = [foo4];
const fooExport = {
    definition: "export foo",
    ranges: exportFooRanges
};
verify.referenceGroups(fooTypesRanges, [fooTypes, fooExport, fooApp]);
verify.referenceGroups(fooAppRanges, [fooApp, fooTypes, fooExport]);
verify.referenceGroups(exportFooRanges, [fooTypes, fooExport, fooApp]);

verify.renameLocations([foo0], [foo0, { range: foo1, suffixText: " as foo" }]);
verify.renameLocations([foo1, foo4], [foo2, foo3, foo4, { range: foo1, prefixText: "foo as " }]);
verify.renameLocations(fooAppRanges, [{ range: foo2, prefixText: "foo as " }, foo3]);

verify.rangesAreRenameLocations({ ranges: [foo2, foo3, foo4, foo0, foo1], providePrefixAndSuffixTextForRename: false });