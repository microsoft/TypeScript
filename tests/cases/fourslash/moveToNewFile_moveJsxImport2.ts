/// <reference path='fourslash.ts' />

// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

// @Filename: file.tsx
//// import React = require('react');
//// [|<div/>;|]
//// <div/>;

verify.moveToNewFile({
    newFileContents: {
        "/tests/cases/fourslash/file.tsx":
`import React = require('react');
<div/>;`,
        "/tests/cases/fourslash/newFile.tsx":
`import React = require('react');
<div />;
`,
    }
});
