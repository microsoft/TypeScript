/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// const a = 10;
//// const b = 10;[||]
//// const c = 10;

// @Filename: /tsconfig.json
////{ "files": ["target.ts"] }

const range = test.ranges();
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.pasteEdits({
    copies: [{
        text: `/**
* Testing comment line 1
* line 2
* line 3
* line 4
*/`
    }],
    pastes: [range[0]],
    newFileContents: {
        "/target.ts":
`const a = 10;
const b = 10;/**
* Testing comment line 1
* line 2
* line 3
* line 4
*/
const c = 10;`
    }
});