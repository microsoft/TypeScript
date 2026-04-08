package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceAliasedImportExport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare const foo: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
exports./*target*/foo = 1;
// @Filename: /home/src/workspaces/project/index.ts
import { foo as /*importAlias*/bar } from "pkg";
bar;
// @Filename: /home/src/workspaces/project/reexport.ts
export { foo as /*reExportAlias*/bar } from "pkg";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importAlias", "reExportAlias")
}

func TestGoToSourceAliasedImportSpecifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// import { original as alias } uses the propertyName branch.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function original(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*target*/original() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import { original as /*aliasedImport*/renamed } from "pkg";
renamed();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "aliasedImport")
}

func TestGoToSourceCallThroughImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When calling an imported function, the checker returns both the import specifier
	// (in the current file) and the call signature target (from .d.ts → mapped to .js).
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare class Widget {
    constructor(name: string);
    render(): void;
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export class /*targetWidget*/Widget {
    constructor(name) { this.name = name; }
    /*targetRender*/render() {}
}
// @Filename: /home/src/workspaces/project/index.ts
import { Widget } from "pkg";
const w = new /*constructorCall*/Widget("test");
w./*methodCall*/render();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "constructorCall", "methodCall")
}

func TestGoToSourceCallbackParam(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/package.json
{
    "name": "@types/yargs",
    "version": "1.0.0",
    "types": "./index.d.ts"
}
// @Filename: /home/src/workspaces/project/node_modules/@types/yargs/index.d.ts
export interface Yargs { positional(): Yargs; }
export declare function command(command: string, cb: (yargs: Yargs) => void): void;
// @Filename: /home/src/workspaces/project/node_modules/yargs/package.json
{
    "name": "yargs",
    "version": "1.0.0",
    "main": "index.js"
}
// @Filename: /home/src/workspaces/project/node_modules/yargs/index.js
export function command(cmd, cb) { cb({ /*end*/positional: "This is obviously not even close to realistic" }); }
// @Filename: /home/src/workspaces/project/index.ts
import { command } from "yargs";
command("foo", yargs => {
    yargs.[|/*start*/positional|]();
});`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "start")
}

func TestGoToSourceReExportNames(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function foo(): string;
export declare function bar(): number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*targetFoo*/foo() { return "ok"; }
export function /*targetBar*/bar() { return 42; }
// @Filename: /home/src/workspaces/project/reexport.ts
export { /*reExportFoo*/foo, /*reExportBar*/bar } from "pkg";
// @Filename: /home/src/workspaces/project/index.ts
import { foo, bar } from [|"pkg"/*moduleSpecifier*/|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "reExportFoo", "reExportBar", "moduleSpecifier")
}

func TestGoToSourceReExportModuleSpecifier(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function alpha(): string;
export declare function beta(): number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*targetAlpha*/alpha() { return "a"; }
export function /*targetBeta*/beta() { return 2; }
// @Filename: /home/src/workspaces/project/reexport.ts
export { alpha, beta } from [|"pkg"/*reExportSpecifier*/|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "reExportSpecifier")
}

func TestGoToSourceReExportedImplementation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts", "type": "module" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export { foo } from "./foo";
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export { foo } from "./foo.js";
// @Filename: /home/src/workspaces/project/node_modules/pkg/foo.d.ts
export declare function foo(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/foo.js
export function /*target*/foo() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import { /*importName*/foo } from "pkg";
foo/*start*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName", "start")
}

func TestGoToSourceImportFilteredByExternalDeclaration(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function helper(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*target*/helper() {}
// @Filename: /home/src/workspaces/project/index.ts
import { helper } from "pkg";
helper/*usage*/();
export { helper as /*reExport*/myHelper } from "pkg";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage", "reExport")
}

func TestGoToSourceDtsReExport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The .d.ts declaration itself re-exports from another module,
	// so findContainingModuleSpecifier(declaration) finds that specifier.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.d.ts
export declare function helper(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.js
export function /*target*/helper() {}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export { helper } from "./impl";
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export { helper } from "./impl.js";
// @Filename: /home/src/workspaces/project/index.ts
import { helper } from "pkg";
helper/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourceBarrelReExportChain(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// index.js re-exports from impl.js, causing getForwardedImplementationFiles
	// to follow the chain.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.js
export function /*target*/doWork() { return 42; }
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.d.ts
export declare function doWork(): number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export { doWork } from "./impl";
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export { doWork } from "./impl.js";
// @Filename: /home/src/workspaces/project/index.ts
import { /*importName*/doWork } from "pkg";
doWork/*callSite*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName", "callSite")
}

func TestGoToSourceCJSReExportViaDefineProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function greet(name: string): string;
export declare enum TargetPopulation {
    Team = "team",
    Public = "public",
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetPopulation = exports.greet = void 0;
var impl_1 = require("./impl");
Object.defineProperty(exports, "greet", { enumerable: true, get: function () { return impl_1.greet; } });
var types_1 = require("./types");
Object.defineProperty(exports, "TargetPopulation", { enumerable: true, get: function () { return types_1.TargetPopulation; } });
// @Filename: /home/src/workspaces/project/node_modules/pkg/impl.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = void 0;
function /*greetImpl*/greet(name) { return "Hello, " + name; }
exports.greet = greet;
// @Filename: /home/src/workspaces/project/node_modules/pkg/types.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetPopulation = void 0;
var /*targetPopulationImpl*/TargetPopulation;
(function (TargetPopulation) {
    TargetPopulation["Team"] = "team";
    TargetPopulation["Public"] = "public";
})(TargetPopulation || (exports.TargetPopulation = TargetPopulation = {}));
// @Filename: /home/src/workspaces/project/index.ts
import { /*namedImport*/greet, /*enumImport*/TargetPopulation } from "pkg";
greet/*call*/("world");
TargetPopulation/*enumAccess*/.Team;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "namedImport", "enumImport", "call", "enumAccess")
}
