/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.ts
////export const x = 0;

// @Filename: /dir/index.ts
////export const x = 0;

// @Filename: /b.ts
////import * as a from "[|./a|]";
////import a2 = require("[|./a|]");
////import * as dir from "[|{| "target": "dir" |}./dir|]";
////import * as dir2 from "[|{| "target": "dir/index" |}./dir/index|]";

// @Filename: /c.js
////const a = require("[|./a|]");

verify.noErrors();
goTo.eachRange(range => {
    const target = range.marker && range.marker.data && range.marker.data.target;
    const name = target === "dir" ? "/dir" : target === "dir/index" ? "/dir/index.ts" : "/a.ts";
    const kind = target === "dir" ? "directory" : "module";
    verify.renameInfoSucceeded(/*displayName*/ name, /*fullDisplayName*/ name, /*kind*/ kind, /*kindModifiers*/ "", /*fileToRename*/ name, range);
});
