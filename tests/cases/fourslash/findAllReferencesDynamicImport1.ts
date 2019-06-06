/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function foo() { return "foo"; }

//// [|import("[|{| "declarationRangeIndex": 0 |}./foo|]")|]
//// [|var x = import("[|{| "declarationRangeIndex": 2 |}./foo|]")|]

verify.singleReferenceGroup('module "/tests/cases/fourslash/foo"', "./foo");
