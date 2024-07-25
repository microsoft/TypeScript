// @module: esnext
// @moduleResolution: bundler, node10, classic
// @noEmit: true

// @Filename: /node_modules/@types/foo/package.json
{
  "name": "@types/foo",
  "version": "1.0.0",
  "exports": {
    ".": {
      "import": "./index.d.mts",
      "require": "./index.d.cts"
    }
  }
}

// @Filename: /node_modules/@types/foo/index.d.mts
export declare const x: "module";

// @Filename: /node_modules/@types/foo/index.d.cts
export declare const x: "script";

// @Filename: /app.ts
type Default = typeof import("foo").x;
type Import = typeof import("foo", { assert: { "resolution-mode": "import" } }).x;
type Require = typeof import("foo", { assert: { "resolution-mode": "require" } }).x;
// resolution-mode does not enforce file extension in `bundler`, just sets conditions
type ImportRelative = typeof import("./other", { assert: { "resolution-mode": "import" } }).x;
type RequireRelative = typeof import("./other", { assert: { "resolution-mode": "require" } }).x;

// @Filename: /other.ts
export const x = "other";
