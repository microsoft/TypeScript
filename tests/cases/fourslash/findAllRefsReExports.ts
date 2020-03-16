/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|](): void {}|]

// @Filename: /b.ts
////[|export { [|{| "contextRangeIndex": 2 |}foo|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}bar|] } from "./a";|]

// @Filename: /c.ts
////[|export { [|{| "contextRangeIndex": 5 |}foo|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}default|] } from "./a";|]

// @Filename: /d.ts
////[|export { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 8 |}default|] } from "./c";|]

// @Filename: /e.ts
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 10 |}bar|] } from "./b";|]
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 12 |}baz|] from "./c";|]
////[|import { [|{| "contextRangeIndex": 14 |}default|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 14 |}bang|] } from "./c";|]
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 17 |}boom|] from "./d";|]
////[|bar|](); [|baz|](); [|bang|](); [|boom|]();

verify.noErrors();
const [
    foo0Def, foo0,
    foo1Def, foo1, bar0,
    foo2Def, foo2, defaultC,
    defaultDDef, defaultD,
    bar1Def, bar1,
    baz0Def, baz0,
    defaultEDef, defaultE, bang0,
    boom0Def, boom0,
    bar2, baz1, bang1, boom1
] = test.ranges();
const a = { definition: "function foo(): void", ranges: [foo0, foo1, foo2] };
const b = { definition: "(alias) function bar(): void\nexport bar", ranges: [bar0] };
const c = { definition: "(alias) function foo(): void\nexport default", ranges: [defaultC, defaultE] };
const d = { definition: "(alias) function foo(): void\nexport default", ranges: [defaultD] };
const eBar = { definition: "(alias) function bar(): void\nimport bar", ranges: [bar1, bar2] };
const eBaz = { definition: "(alias) function baz(): void\nimport baz", ranges: [baz0, baz1] };
const eBang = { definition: "(alias) function bang(): void\nimport bang", ranges: [bang0, bang1] };
const eBoom = { definition: "(alias) function boom(): void\nimport boom", ranges: [boom0, boom1] };

verify.referenceGroups([foo0, foo1, foo2], [a, b, eBar, c, d, eBoom, eBaz, eBang]);

verify.referenceGroups(bar0, [b, eBar]);
verify.referenceGroups([bar1, bar2], [eBar, b]);

verify.referenceGroups([defaultC, defaultE], [c, d, eBoom, eBaz, eBang]);
verify.referenceGroups(defaultD, [d, eBoom, a, b, eBar,c, eBaz, eBang]);
verify.referenceGroups([baz0, baz1], [eBaz, c, d, eBoom, eBang]);

verify.referenceGroups([bang0, bang1], [eBang]);
verify.referenceGroups([boom0, boom1], [eBoom, d, a, b, eBar, c, eBaz, eBang]);

test.rangesByText().forEach((ranges, text) => {
    if (text.indexOf("export") === 0 || text.indexOf("import") === 0) return;
    switch (text) {
        case "default":
            for (const range of ranges) {
                goTo.rangeStart(range);
                verify.renameInfoFailed();
            }
            break;
        case "bar": {
            const [r0, r1, ...tail] = ranges;
            verify.renameLocations(r0, ranges);
            verify.renameLocations([r1, ...tail], [{ range: r1, prefixText: "bar as " }, ...tail]);
            break;
        }
        default:
            verify.rangesAreRenameLocations(ranges);
            break;
    }
});
