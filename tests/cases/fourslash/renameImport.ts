/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /node_modules/global/index.d.ts
////export const x: number;

// @Filename: /a.ts
////export const x = 0;

// @Filename: /dir/index.ts
////export const x = 0;

// @Filename: /b.ts
////import * as a from "./[|a|]";
////import a2 = require("./[|a|]");
////import * as dir from "./[|{| "target": "dir" |}dir|]";
////import * as dir2 from "./dir/[|{| "target": "dir/index" |}index|]";

// @Filename: /c.js
////const a = require("./[|a|]");
////const global = require("/*global*/global");

verify.noErrors();
goTo.eachRange(range => {
    const target = range.marker && range.marker.data && range.marker.data.target;
    const displayName = target === "dir" ? "./dir" : target === "dir/index" ? "./dir/index" : "./a";
    const fileName = target === "dir" ? "/dir" : target === "dir/index" ? "/dir/index.ts" : "/a.ts";
    const kind = target === "dir" ? "directory" : "module";
    verify.renameInfoSucceeded(/*displayName*/ fileName, /*fullDisplayName*/ displayName, /*kind*/ kind, /*kindModifiers*/ "", /*fileToRename*/ fileName, range);
    verify.renameInfoFailed("You cannot rename this element.", { allowRenameOfImportPath: false });
});

goTo.marker("global");
verify.renameInfoFailed("You cannot rename a module via a global import.");
