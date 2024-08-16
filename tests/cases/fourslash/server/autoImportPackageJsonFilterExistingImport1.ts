/// <reference path="../fourslash.ts" />

// @module: preserve

// @Filename: /node_modules/@types/react/index.d.ts
//// export declare function useMemo(): void;
//// export declare function useState(): void;

// @Filename: /package.json
//// {}

// @Filename: /index.ts
//// import { useState } from "react";
//// useMemo/**/

goTo.marker("");
verify.importFixAtPosition([
`import { useMemo, useState } from "react";
useMemo`
]);

edit.deleteLine(0);
goTo.marker("");
verify.importFixAtPosition([]);
