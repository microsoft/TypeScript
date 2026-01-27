/// <reference path='fourslash.ts' />

// @jsx: preserve
// @libFiles: react.d.ts

// @Filename: file.tsx
//// import React = require('react');
//// [|<div/>;|]
//// 1;

verify.moveToNewFile({
    newFileContents: {
        "/tests/cases/fourslash/file.tsx":
`1;`,
        "/tests/cases/fourslash/newFile.tsx":
`import React = require('react');

<div />;
`,
    }
});
