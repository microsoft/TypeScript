/// <reference path='fourslash.ts' />

// @Filename: f.ts
////export { [|foo|] as [|{| "isWriteAccess": true, "isDefinition": true |}default|] };
////function /*start*/[|{| "isWriteAccess": true, "isDefinition": true |}foo|](a: number, b: number) {
////    return a + b;
////}

// @Filename: b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}bar|] from "./f";
////[|bar|](1, 2);

verify.noErrors();
const [ foo0, foo1, foo2, bar0, bar1 ] = test.ranges();
const fooGroup = { definition: "function foo(a: number, b: number): number", ranges: [foo0, foo2] };
const exportDefaultGroup = { definition: "(alias) function foo(a: number, b: number): number\nexport default", ranges: [foo1] };
const barGroup = { definition: "(alias) function bar(a: number, b: number): number\nimport bar", ranges: [bar0, bar1]};
verify.referenceGroups("start", [fooGroup, exportDefaultGroup, barGroup]);
