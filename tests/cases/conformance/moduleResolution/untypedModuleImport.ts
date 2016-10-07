// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// This tests that an import can be matched by a `package.json`, giving us untyped import

// @filename: /node_modules/foo/package.json
{}

// This is ignored because we don't have --allowJs
// @filename: /node_modules/foo/index.js
I am ignored

// @filename: /a.ts
import * as foo from "foo";
foo.bar();

// @filename: /b.ts
import foo = require("foo");
foo();

// @filename: /c.ts
import foo, { bar } from "foo";
import "./a";
import "./b";
foo(bar());
