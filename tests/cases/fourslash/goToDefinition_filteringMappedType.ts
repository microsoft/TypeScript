///<reference path="fourslash.ts"/>

////const obj = { /*def*/a: 1, b: 2 };
////const filtered: { [P in keyof typeof obj as P extends 'b' ? never : P]: 0; } = { a: 0 };
////filtered.[|/*ref*/a|];

verify.baselineGoToDefinition("ref");
