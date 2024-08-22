/// <reference path="../fourslash.ts" />

// @module: preserve

// @Filename: /node_modules/@types/react/index.d.ts
//// export declare function useMemo(): void;
//// export declare function useState(): void;

// @Filename: /package.json
//// {}

// @Filename: /index.ts
//// useMemo/**/

goTo.marker("");
verify.importFixAtPosition([]);

goTo.bof();
edit.insertLine(`import { useState } from "react";`);

goTo.marker("");
verify.importFixAtPosition([
`import { useMemo, useState } from "react";
useMemo`
]);
