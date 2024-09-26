/// <reference path="../fourslash.ts" />

// @module: preserve

// @Filename: /home/src/workspaces/project/node_modules/@types/react/index.d.ts
//// export declare function useMemo(): void;
//// export declare function useState(): void;

// @Filename: /home/src/workspaces/project/package.json
//// {}

// @Filename: /home/src/workspaces/project/index.ts
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
