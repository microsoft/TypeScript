/// <reference path='fourslash.ts' />

// @Filename: /foo.ts
////const foo = "foo";
////export { foo as "[|__<alias>|]" };
////import { "[|__<alias>|]" as bar } from "./foo";
////if (bar !== "foo") throw bar;

// @Filename: /bar.ts
////import { "[|__<alias>|]" as first } from "./foo";
////export { "[|__<alias>|]" as "<other>" } from "./foo";
////import { "<other>" as second } from "./bar";
////if (first !== "foo") throw first;
////if (second !== "foo") throw second;

verify.noErrors();
verify.baselineRename(test.ranges());
verify.baselineGoToDefinition(...test.ranges());
verify.baselineFindAllReferences(...test.ranges());
