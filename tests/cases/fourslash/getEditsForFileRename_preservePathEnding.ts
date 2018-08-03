/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /index.js
////export const x = 0;

// @Filename: /a.js
////import { x as x0 } from ".";
////import { x as x1 } from "./index";
////import { x as x2 } from "./index.js";

verify.getEditsForFileRename({
    oldPath: "/a.js",
    newPath: "/b.js",
    newFileContents: {}, // No change
});

verify.getEditsForFileRename({
    oldPath: "/b.js",
    newPath: "/src/b.js",
    newFileContents: {
        "/b.js":
`import { x as x0 } from "..";
import { x as x1 } from "../index";
import { x as x2 } from "../index.js";`,
    },
});

