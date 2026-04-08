package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceAccessExpressionProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare const obj: { greet(name: string): string; count: number; };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const /*targetObj*/obj = { /*targetGreet*/greet(name) { return name; }, /*targetCount*/count: 42 };
// @Filename: /home/src/workspaces/project/index.ts
import { obj } from "pkg";
obj./*propAccess*/greet("world");
obj./*propAccess2*/count;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "propAccess", "propAccess2")
}

func TestGoToSourcePropertyOfAlias(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/a.js
export const a = { /*end*/a: 'a' };
// @Filename: /home/src/workspaces/project/a.d.ts
export declare const a: { a: string };
// @Filename: /home/src/workspaces/project/b.ts
import { a } from './a';
a.[|a/*start*/|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "start")
}

func TestGoToSourceIndexSignatureProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When accessing a property defined via index signature, getDeclarationsFromLocation
	// returns empty, so the GetPropertyOfType fallback is used.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare const config: { readonly [key: string]: string; name: string };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const config = { /*targetName*/name: "test" };
// @Filename: /home/src/workspaces/project/index.ts
import { config } from "pkg";
config./*propAccess*/name;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "propAccess")
}

func TestGoToSourceMappedTypeProperty(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// getDeclarationsFromLocation returns empty for a property that exists only
	// via a mapped type (no explicit declaration), so GetPropertyOfType fallback is used.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
type Keys = "a" | "b";
export declare const obj: { [K in Keys]: number };
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export const obj = { a: 1, /*target*/b: 2 };
// @Filename: /home/src/workspaces/project/index.ts
import { obj } from "pkg";
obj./*propAccess*/b;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "propAccess")
}

func TestGoToSourceCommonJSAliasPrefersDeclaration(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare enum TargetPopulation {
    Team = "team",
    Internal = "internal",
    Insiders = "insider",
    Public = "public",
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetPopulation = void 0;
var TargetPopulation;
(function (TargetPopulation) {
    TargetPopulation["Team"] = "team";
    TargetPopulation["Internal"] = "internal";
    TargetPopulation["Insiders"] = "insider";
    TargetPopulation["Public"] = "public";
})(TargetPopulation || (exports.TargetPopulation = TargetPopulation = {}));
// @Filename: /home/src/workspaces/project/index.ts
import * as tas from "pkg";
tas./*start*/TargetPopulation.Public;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "start")
}
