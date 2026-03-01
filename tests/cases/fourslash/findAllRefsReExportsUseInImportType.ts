/// <reference path="fourslash.ts" />

// @Filename: /foo/types/types.ts
////[|export type /*full0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Full|] = { prop: string; };|]

// @Filename: /foo/types/index.ts
////[|import * as /*foo0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}foo|] from './types';|]
////[|export { /*foo1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}foo|] };|]

// @Filename: /app.ts
////[|import { /*foo2*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}foo|] } from './foo/types';|]
////export type fullType = /*foo3*/[|foo|]./*full1*/[|Full|];
////type namespaceImport = typeof import('./foo/types');
////type fullType2 = import('./foo/types')./*foo4*/[|foo|]./*full2*/[|Full|];

verify.noErrors();
const [full0Def, full0, foo0Def, foo0, foo1Def, foo1, foo2Def, foo2, foo3, full1, foo4, full2] = test.ranges();
const fullRanges = [full0, full1, full2];
const full = {
    definition: "type Full = {\n    prop: string;\n}",
    ranges: fullRanges
};

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

verify.baselineFindAllReferences('full0', 'full1', 'full2', 'foo0', 'foo1', 'foo2', 'foo3', 'foo4');
verify.baselineRename(fullRanges);
verify.baselineRename(foo0);
verify.baselineRename([foo1, foo4]);
verify.baselineRename(fooAppRanges);
verify.baselineRename([foo2, foo3, foo4, foo0, foo1], { providePrefixAndSuffixTextForRename: false });