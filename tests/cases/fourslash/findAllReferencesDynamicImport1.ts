/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function foo() { return "foo"; }

//// [|import("[|{| "contextRangeIndex": 0 |}./foo|]")|]
//// [|var x = import("[|{| "contextRangeIndex": 2 |}./foo|]")|]

verify.singleReferenceGroup('module "/tests/cases/fourslash/foo"', "./foo");
