// @checkJs: true
// @outDir: dist
// @target: esnext
// @module: commonjs,nodenext
// @rewriteRelativeImportExtensions: true
// @noTypesAndSymbols: true

// @Filename: a.js
{
  require("" + "./foo.ts");
  import("" + "./foo.ts");
  require("./foo.ts");
  import("./foo.ts");
}

// @Filename: b.ts
{
  import("" + "./foo.ts");
  import("./foo.ts");
}
