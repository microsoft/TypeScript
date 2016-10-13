// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
// @allowJs: true
// @maxNodeModuleJsDepth: 1
// Same as untypedModuleImport.ts but with --allowJs (which has no effect)

// @filename: /node_modules/foo/package.json
{}

// @filename: /node_modules/foo/index.js
exports.default = {
    bar() { return 0; }
}

// @filename: /a.ts
import foo from "foo";
foo.bar();
