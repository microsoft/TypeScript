/// <reference path="fourslash.ts" />
// @module: es2015
// @esModuleInterop: true
// @jsx: react

// @Filename: /types.d.ts
//// declare module "react" { var React: any; export = React; export as namespace React; }

// @Filename: /component.tsx
//// export function Component() { return <div />; }

// @Filename: /a.tsx
//// import type React from "react";
//// import type { Component } from "./component";
//// (<Component/**/ />)

goTo.marker("");

// It would be preferable for these fixes to be provided simultaneously, like the add-new-import fixes are,
// but this is such a weird edge case that I don't know that it's worth it - the test mainly ensures that
// both fixes are eventually offered without crashing and that they do what they say they're going to do.

verify.codeFix({
  index: 0,
  description: [ts.Diagnostics.Remove_type_from_import_declaration_from_0.message, "react"],
  applyChanges: true,
  newFileContent: `import React from "react";
import type { Component } from "./component";
(<Component />)`
});

verify.codeFix({
  index: 0,
  description: [ts.Diagnostics.Remove_type_from_import_declaration_from_0.message, "./component"],
  applyChanges: true,
  newFileContent: `import React from "react";
import { Component } from "./component";
(<Component />)`
});
