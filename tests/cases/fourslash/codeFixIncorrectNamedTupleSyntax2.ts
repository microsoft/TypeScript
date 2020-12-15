/// <reference path='fourslash.ts' />

////type Tup = [first: string, elem: any[]?];

verify.codeFix({
    description: "Move labeled tuple element modifiers to labels",
    index: 0,
    newFileContent: 
  `type Tup = [first: string, elem?: any[]];`
});