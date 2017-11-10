/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @maxNodeModuleJsDepth: 2
// @moduleResolution: node

// @Filename: /node_modules/_foo/index.js
////exports.render = 0;

// @Filename: /node_modules/foo/index.js
////exports.render = 0;

// @Filename: /a.js
////[|render/**/;|]

goTo.file("/a.js");

// No import fix for `_foo`
verify.importFixAtPosition([
`import { render } from "foo";

render;`,
]);
