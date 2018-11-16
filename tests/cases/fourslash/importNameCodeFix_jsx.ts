/// <reference path="fourslash.ts" />

// @jsx: react

// @Filename: /node_modules/react/index.d.ts
////export const React: any;

// @Filename: /a.tsx
////[|<this>|]</this>

// @Filename: /Foo.tsx
////export const Foo = 0;

// @Filename: /c.tsx
////import { React } from "react";
////<Foo />;

// @Filename: /d.tsx
////import { Foo } from "./Foo";
////<Foo />;

// Tests that we don't crash at non-identifier location.
goTo.file("/a.tsx");
verify.importFixAtPosition([]);

// When constructor is missing, provide fix for that
goTo.file("/c.tsx");
verify.importFixAtPosition([
`import { React } from "react";
import { Foo } from "./Foo";
<Foo />;`]);

// When JSX namespace is missing, provide fix for that
goTo.file("/d.tsx");
verify.importFixAtPosition([
`import { Foo } from "./Foo";
import { React } from "react";
<Foo />;`]);
