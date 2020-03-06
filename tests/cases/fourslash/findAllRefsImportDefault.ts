/// <reference path='fourslash.ts' />

// @Filename: f.ts
////[|export { [|{| "contextRangeIndex": 0 |}foo|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}default|] };|]
////[|function /*start*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 3 |}foo|](a: number, b: number) {
////    return a + b;
////}|]

// @Filename: b.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}bar|] from "./f";|]
////[|bar|](1, 2);

verify.noErrors();
const [ foo0Def, foo0, foo1, foo2Def, foo2, bar0Def, bar0, bar1 ] = test.ranges();
const fooGroup = { definition: "function foo(a: number, b: number): number", ranges: [foo0, foo2] };
const exportDefaultGroup = { definition: "(alias) function foo(a: number, b: number): number\nexport default", ranges: [foo1] };
const barGroup = { definition: "(alias) function bar(a: number, b: number): number\nimport bar", ranges: [bar0, bar1]};
verify.referenceGroups("start", [fooGroup, exportDefaultGroup, barGroup]);
