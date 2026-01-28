/// <reference path='fourslash.ts' />

// @jsx: preserve

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
