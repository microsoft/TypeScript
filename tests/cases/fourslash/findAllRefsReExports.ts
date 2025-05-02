/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export function /*foo0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|](): void {}|]

// @Filename: /b.ts
////[|export { /*foo1*/[|{| "contextRangeIndex": 2 |}foo|] as /*bar0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}bar|] } from "./a";|]

// @Filename: /c.ts
////[|export { /*foo2*/[|{| "contextRangeIndex": 5 |}foo|] as /*defaultC*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}default|] } from "./a";|]

// @Filename: /d.ts
////[|export { /*defaultD*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 8 |}default|] } from "./c";|]

// @Filename: /e.ts
////[|import { /*bar1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 10 |}bar|] } from "./b";|]
////[|import /*baz0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 12 |}baz|] from "./c";|]
////[|import { /*defaultE*/[|{| "contextRangeIndex": 14 |}default|] as /*bang0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 14 |}bang|] } from "./c";|]
////[|import /*boom0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 17 |}boom|] from "./d";|]
/////*bar2*/[|bar|](); /*baz1*/[|baz|](); /*bang1*/[|bang|](); /*boom1*/[|boom|]();

verify.noErrors();
verify.baselineFindAllReferences(
    'foo0', 'foo1', 'foo2',
    'bar0', 'bar1', 'bar2',
    'defaultC', 'defaultE', 'defaultD',
    'baz0', 'baz1',
    'bang0', 'bang1',
    'boom0', 'boom1'
);
test.rangesByText().forEach((ranges, text) => {
    if (text.indexOf("export") === 0 || text.indexOf("import") === 0) return;
    switch (text) {
        case "default":
            for (const range of ranges) {
                goTo.rangeStart(range);
                verify.renameInfoFailed();
            }
            break;
        default:
            verify.baselineRename(ranges);
            break;
    }
});