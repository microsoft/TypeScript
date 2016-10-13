// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// @allowJs: true
// @maxNodeModuleJsDepth: 1
// Same as untypedModuleImport.ts but with --allowJs (which has no effect)

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
import "./a";
import "./b";
foo(bar());
