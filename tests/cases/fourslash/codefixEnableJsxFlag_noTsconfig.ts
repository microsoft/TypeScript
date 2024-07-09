/// <reference path='fourslash.ts' />

// @Filename: /dir/a.tsx
////export const Component = () => <></>

goTo.file("/dir/a.tsx");
verify.not.codeFixAvailable();
