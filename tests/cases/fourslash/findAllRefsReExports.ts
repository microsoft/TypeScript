/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function [|{| "isWriteAccess": true, "isDefinition": true |}foo|](): void {}

// @Filename: /b.ts
////export { [|foo|] as [|{| "isWriteAccess": true, "isDefinition": true |}bar|] } from "./a";

// @Filename: /c.ts
////export { [|foo|] as [|{| "isWriteAccess": true, "isDefinition": true |}default|] } from "./a";

// @Filename: /d.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}default|] } from "./c";

// @Filename: /e.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}bar|] } from "./b";
////import [|{| "isWriteAccess": true, "isDefinition": true |}baz|] from "./c";
////import { [|default|] as [|{| "isWriteAccess": true, "isDefinition": true |}bang|] } from "./c";
////import [|{| "isWriteAccess": true, "isDefinition": true |}boom|] from "./d";
////[|bar|](); [|baz|](); [|bang|](); [|boom|]();

verify.noErrors();
const [foo0, foo1, bar0, foo2, defaultC, defaultD, bar1, baz0, defaultE, bang0, boom0, bar2, baz1, bang1, boom1] = test.ranges();
const a = { definition: "function foo(): void", ranges: [foo0, foo1, foo2] };
const b = { definition: "(alias) function bar(): void\nimport bar", ranges: [bar0] };
const c = { definition: "(alias) function foo(): void\nimport default", ranges: [defaultC, defaultE] };
const d = { definition: "(alias) function foo(): void\nimport default", ranges: [defaultD] };
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
    if (text === "default") {
        for (const range of ranges) {
            goTo.rangeStart(defaultC);
            verify.renameInfoFailed();
        }
    }
    else {
        verify.rangesAreRenameLocations(ranges);
    }
});
