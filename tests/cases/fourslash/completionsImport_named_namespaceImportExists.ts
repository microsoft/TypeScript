/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function foo() {}

// @Filename: /b.ts
////import * as a from "./a";
////f/**/;

goTo.marker("");
verify.completionListContains("foo", "function foo(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true);

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    description: `Import 'foo' from "./a".`,
    // TODO: GH#18445
    newFileContent: `import * as a from "./a";
import { foo } from "./a";\r
f;`,
});
