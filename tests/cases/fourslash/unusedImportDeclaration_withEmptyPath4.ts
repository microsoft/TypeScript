/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////// leading trivia
////import * as a from "";
////import * as b from "";
////import * as c from "";

verify.codeFix({
    index: 0,
    description: "Remove import from ''",
    newFileContent:
`// leading trivia
import * as b from "";
import * as c from "";`,
});

verify.codeFix({
    index: 1,
    description: "Remove import from ''",
    newFileContent:
`// leading trivia
import * as a from "";
import * as c from "";`,
});

verify.codeFix({
    index: 2,
    description: "Remove import from ''",
    newFileContent:
`// leading trivia
import * as a from "";
import * as b from "";
`
});
