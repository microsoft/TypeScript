/// <reference path='fourslash.ts' />

// @Filename: /foo.ts
////type foo = "foo";
////export { type foo as "[|__<alias>|]" };
////import { type "[|__<alias>|]" as bar } from "./foo";
////const testBar: bar = "foo";

// @Filename: /bar.ts
////import { type "[|__<alias>|]" as first } from "./foo";
////export { type "[|__<alias>|]" as "<other>" } from "./foo";
////import { type "<other>" as second } from "./bar";
////const testFirst: first = "foo";
////const testSecond: second = "foo";

verify.noErrors();
verify.baselineRename(test.ranges());
verify.baselineGoToDefinition(...test.ranges());
verify.baselineFindAllReferences(...test.ranges());
