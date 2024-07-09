/// <reference path='fourslash.ts' />

// Test that we don't crash when encountering a keyword in a JSX identifier.

// @Filename: /a.tsx
////<div module-layout=""></div>

format.document();
verify.currentFileContentIs(`<div module-layout=""></div>`);
