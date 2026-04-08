package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceAtTypesPackage(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// NoDts resolver can't resolve "foo" to any .js (only @types/foo has .d.ts),
	// so findImplementationFileFromDtsFileName maps @types/foo → foo and finds the .js.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/@types/foo/package.json
{ "name": "@types/foo", "version": "1.0.0" }
// @Filename: /home/src/workspaces/project/node_modules/@types/foo/index.d.ts
export declare function bar(): string;
// @Filename: /home/src/workspaces/project/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0", "main": "./index.js" }
// @Filename: /home/src/workspaces/project/node_modules/foo/index.js
export function /*target*/bar() { return "hello"; }
// @Filename: /home/src/workspaces/project/index.ts
import { bar } from "foo";
bar/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourcePackageIndexDts(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When the .d.ts is index.d.ts, tryPackageRootFirst is true,
	// so package root resolution is tried before subpath.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./lib/index.js", "types": "./lib/index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/lib/index.d.ts
export declare function greet(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/lib/index.js
export function /*target*/greet() { return "hi"; }
// @Filename: /home/src/workspaces/project/index.ts
import { greet } from "pkg";
greet/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourcePackageRootThenSubpath(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// tryPackageRootFirst is true (index.d.ts), root resolution fails because
	// there's no main entry, but subpath resolution ("pkg/index") succeeds.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function work(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*target*/work() {}
// @Filename: /home/src/workspaces/project/index.ts
import { work } from "pkg";
work/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourcePackageRootFallsBackToSubpath(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// tryPackageRootFirst is true (index.d.ts), root resolution fails,
	// falls back to subpath.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function work(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*target*/work() {}
// @Filename: /home/src/workspaces/project/index.ts
import { work } from "pkg";
work/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}

func TestGoToSourceSubpathNotIndex(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Subpath resolution succeeds when the d.ts is NOT index.d.ts.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "types": "./lib/utils.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/lib/utils.d.ts
export declare function util(): void;
// @Filename: /home/src/workspaces/project/node_modules/pkg/lib/utils.js
export function /*target*/util() {}
// @Filename: /home/src/workspaces/project/index.ts
import { util } from "pkg";
util/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}
