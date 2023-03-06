/// <reference path="fourslash.ts" />
// @module: es2015
// @esModuleInterop: true
// @jsx: react

// @Filename: /types.d.ts
//// declare module "react" { var React: any; export = React; export as namespace React; }

// @Filename: /a.tsx
//// import type React from "react";
//// function Component() {}
//// (<Component/**/ />)

goTo.marker("");

verify.importFixAtPosition([
`import React from "react";
function Component() {}
(<Component />)`]);