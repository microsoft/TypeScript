/// <reference path="fourslash.ts" />

// @jsx: react
// @module: esnext
// @esModuleInterop: true
// @moduleResolution: bundler
// @Filename: /node_modules/react/index.d.ts
////// React was not defined

// @Filename: /a.tsx
////<[|Text|]></Text>;

goTo.file("/a.tsx");
verify.not.codeFixAvailable();
