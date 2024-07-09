/// <reference path="fourslash.ts" />

// @jsx: react
// @module: esnext
// @esModuleInterop: true
// @moduleResolution: node

// @Filename: /node_modules/react/index.d.ts
////export = React;
////export as namespace React;
////declare namespace React {
////    class Component {}
////}

// @Filename: /node_modules/react-native/index.d.ts
////import * as React from "react";
////export class Text extends React.Component {};

// @Filename: /a.tsx
////<[|Text|]></Text>;

goTo.file("/a.tsx");

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_import_from_0.message, "react-native"],
    applyChanges: false,
    newFileContent:
`import { Text } from "react-native";

<Text></Text>;`
});

verify.codeFix({
  index: 1,
  description: [ts.Diagnostics.Import_0_from_1.message, "React", "react"],
  applyChanges: false,
  newFileContent:
`import React from "react";

<Text></Text>;`
});
