/// <reference path='fourslash.ts' />

// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts,leftpad.d.ts

// @Filename: file.tsx
//// import React = require('leftpad');
//// [|function F() {
////     const React = import("react");
////     <div/>;
//// }|]
//// React;

verify.moveToNewFile({
    newFileContents: {
        "/tests/cases/fourslash/file.tsx":
`import React = require('leftpad');
React;`,
        // NB: A perfect implementation would not copy over the import
        "/tests/cases/fourslash/F.tsx":
`import React = require('leftpad');
function F() {
    const React = import("react");
    <div />;
}
`,
    }
});
