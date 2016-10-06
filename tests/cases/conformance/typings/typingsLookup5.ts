// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// This tests that an import can be matched by a `package.json` giving us untyped import

// @filename: /tsconfig.json
{}

// @filename: /node_modules/foo/package.json
{}

// @filename: /a.ts
import * as foo from "foo";
foo.bar();

// @filename: /b.ts
import foo = require("foo");
foo();

// @filename: /c.ts
import foo, { bar } from "foo";
foo(bar());
