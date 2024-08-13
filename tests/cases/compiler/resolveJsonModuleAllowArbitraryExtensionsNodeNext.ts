// @declaration: true
// @module: nodenext
// @allowArbitraryExtensions: true
// @resolveJsonModule: true
// @listFiles: true
// @filename: cjs/package.json
{ "type": "commonjs" }
// @filename: cjs/foo.json
["foo", "bar", "baz"]
// @filename: cjs/foo.d.json.ts
declare const data: ["foo", "bar", "baz"];
export default data;
// @filename: cjs/index.mts
import data from "./foo.json" with { type: "json" };

data.default; // foo.d.json.ts is cjs format - no error (`default` is whole file, file has `default` member)
// This means the `.d.json.ts` actually represents a
// { "default": ["foo", "bar", "baz"] }
// and _not_ a straight `["foo", "bar", "baz"]`
// @filename: cjs/secondary.cts
import data from "./foo.json";

data.default; // no error (cjs format `.d.json.ts`, represents a json object with a `default` member)
// @filename: esm/package.json
{ "type": "module" }
// @filename: esm/foo.json
["foo", "bar", "baz"]
// @filename: esm/foo.d.json.ts
declare const data: ["foo", "bar", "baz"];
export default data;
// NOTE: an "esm format" .d.json.ts should never have any exports except
// `default`, since node doesn't create named exports for `.json` imports
// That means this file actually represents a
// `["foo", "bar", "baz"]` json document, but since it's "esm format",
// will not be importable from a cjs caller.
// @filename: esm/index.mts
import data from "./foo.json" with { type: "json" };

data.default; // foo.d.json.ts is esm format - error! (default is the one declared in the file)
// @filename: esm/secondary.cts
import data from "./foo.json"; // error (attempt to import esm format file in cjs file via `import`)

data.default;
// @filename: root.mts
import "./cjs/index.mjs";
import "./cjs/secondary.mjs";
import "./mjs/index.mjs";
import "./mjs/secondary.mjs";
