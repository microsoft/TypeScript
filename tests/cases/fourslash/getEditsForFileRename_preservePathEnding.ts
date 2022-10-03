/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @strict: true
// @jsx: preserve
// @resolveJsonModule: true

// @Filename: /index.js
////export const x = 0;

// @Filename: /jsx.jsx
////export const y = 0;

// @Filename: /j.jonah.json
////{ "j": 0 }

// @Filename: /a.js
////import { x as x0 } from ".";
////import { x as x1 } from "./index";
////import { x as x2 } from "./index.js";
////import { y } from "./jsx.jsx";
////import { j } from "./j.jonah.json";

verify.noErrors();

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
import { x as x2 } from "../index.js";
import { y } from "../jsx.jsx";
import { j } from "../j.jonah.json";`,
    },
});
