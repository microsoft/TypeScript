/// <reference path='fourslash.ts' />

// @Filename: f.ts
////export { [|foo|] as [|{| "isWriteAccess": true, "isDefinition": true |}foo|] }
////function /*start*/[|{| "isWriteAccess": true, "isDefinition": true |}foo|](a: number, b: number) { }

// @Filename: b.ts
////import x = require("./f");
////x.[|foo|](1, 2);

verify.noErrors();
const [ foo0, foo1, foo2, foo3 ] = test.ranges();
const fooGroup = { definition: "function foo(a: number, b: number): void", ranges: [foo0, foo2] };
const exportFooGroup = { definition: "(alias) function foo(a: number, b: number): void\nexport foo", ranges: [foo1, foo3] };
verify.referenceGroups("start", [fooGroup, exportFooGroup]);
