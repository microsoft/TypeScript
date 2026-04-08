package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceNodeModulesWithTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0", "main": "./lib/main.js", "types": "./types/main.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/foo/lib/main.js
export const /*end*/a = "a";
// @Filename: /home/src/workspaces/project/node_modules/foo/types/main.d.ts
export declare const a: string;
// @Filename: /home/src/workspaces/project/index.ts
import { a } from "foo";
[|a/*start*/|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "start")
}

func TestGoToSourceLocalJsBesideDts(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/a.js
export const /*end*/a = "a";
// @Filename: /home/src/workspaces/project/a.d.ts
export declare const a: string;
// @Filename: /home/src/workspaces/project/index.ts
import { a } from [|"./a"/*moduleSpecifier*/|];
[|a/*identifier*/|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "identifier", "moduleSpecifier")
}

func TestGoToSourceNonDeclarationFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Declaration is in a .ts file (not .d.ts),
	// so mapDeclarationToSourceDefinitions returns it as-is.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/utils.ts
export function /*target*/helper() { return 1; }
// @Filename: /home/src/workspaces/project/index.ts
import { helper } from "./utils";
helper/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourceNoImplementationFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// No implementation file can be resolved (types-only package with no .js).
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function typesOnly(): void;
// @Filename: /home/src/workspaces/project/index.ts
import { /*importName*/typesOnly } from "pkg";
typesOnly/*callSite*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName", "callSite")
}

func TestGoToSourceDeclarationMapSourceMap(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// .d.ts has a sourcemap pointing back to the original .ts source.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./dist/index.js", "types": "./dist/index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/src/index.ts
export function /*target*/greet() { return "hi"; }
// @Filename: /home/src/workspaces/project/node_modules/pkg/dist/index.d.ts
export declare function greet(): string;
//# sourceMappingURL=index.d.ts.map
// @Filename: /home/src/workspaces/project/node_modules/pkg/dist/index.d.ts.map
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"AAAA,wBAAgB,KAAK,WAAY"}
// @Filename: /home/src/workspaces/project/node_modules/pkg/dist/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = greet;
function greet() { return "hi"; }
// @Filename: /home/src/workspaces/project/index.ts
import { greet } from "pkg";
greet/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourceDeclarationMapFallback(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// findClosestDeclarationNode walks up parents and finds no declaration,
	// returns entry node. This happens when source map points to a position
	// that's not inside any declaration.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./dist/index.js", "types": "./dist/index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/src/index.ts
/*target*/console.log("side effect");
export function greet() { return "hi"; }
// @Filename: /home/src/workspaces/project/node_modules/pkg/dist/index.d.ts
export declare function greet(): string;
//# sourceMappingURL=index.d.ts.map
// @Filename: /home/src/workspaces/project/node_modules/pkg/dist/index.d.ts.map
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"AAC6B"}
// @Filename: /home/src/workspaces/project/node_modules/pkg/dist/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = greet;
console.log("side effect");
function greet() { return "hi"; }
// @Filename: /home/src/workspaces/project/index.ts
import { greet } from "pkg";
greet/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourceNamedExportsSpecifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function foo(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*target*/foo() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import { foo } from "pkg";
const result = foo/*valueUsage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "valueUsage")
}

func TestGoToSourceTripleSlashReference(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Cursor on a /// <reference path="..."/> directive pointing to a .js file.
	const content = `// @allowJs: true
// @Filename: /home/src/workspaces/project/helper.js
/*target*/function helper() { return 1; }
// @Filename: /home/src/workspaces/project/index.ts
/// <reference path="./[|helper.js/*refPath*/|]" />
declare function helper(): number;
helper();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "refPath")
}

func TestGoToSourceFallbackToModuleSpecifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When the specific name can't be found in the .js implementation file
	// (because the JS uses a different export pattern), the fallback returns
	// the entry declaration of the .js file.
	const content = `// @moduleResolution: bundler
// @allowJs: true
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function internalHelper(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
/*entryPoint*/Object.defineProperty(exports, "internalHelper", { value: function() {} });
// @Filename: /home/src/workspaces/project/index.ts
import { /*importName*/internalHelper } from "pkg";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName")
}

func TestGoToSourceFilterPreferredFallbackAll(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// filterPreferredSourceDeclarations returns all declarations when none are
	// property-like and none are concrete. This happens with re-export specifiers
	// matching the name in the .js file.
	const content = `// @moduleResolution: bundler
// @allowJs: true
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./barrel.js", "types": "./barrel.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/barrel.d.ts
export { value } from "./impl";
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.d.ts
export declare const value: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/barrel.js
export { value } from "./impl.js";
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.js
export const /*target*/value = 42;
// @Filename: /home/src/workspaces/project/index.ts
import { /*importName*/value } from "pkg";
console.log(value);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName")
}
