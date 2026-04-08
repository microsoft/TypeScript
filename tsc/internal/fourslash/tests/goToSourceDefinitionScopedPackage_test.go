package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceScopedPackage(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Scoped packages (@scope/pkg) exercise UnmangleScopedPackageName
	// in findImplementationFileFromDtsFileName.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/@myscope/mylib/package.json
{ "name": "@myscope/mylib", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/@myscope/mylib/index.d.ts
export declare function scopedHelper(): string;
// @Filename: /home/src/workspaces/project/node_modules/@myscope/mylib/index.js
export function /*target*/scopedHelper() { return "scoped"; }
// @Filename: /home/src/workspaces/project/index.ts
import { /*importName*/scopedHelper } from "@myscope/mylib";
scopedHelper/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName", "usage")
}

func TestGoToSourceScopedAtTypesPackage(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// @types/@scope/pkg should map to @scope/pkg implementation.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/@types/myns__mylib/package.json
{ "name": "@types/myns__mylib", "version": "1.0.0" }
// @Filename: /home/src/workspaces/project/node_modules/@types/myns__mylib/index.d.ts
export declare function nsHelper(): number;
// @Filename: /home/src/workspaces/project/node_modules/@myns/mylib/package.json
{ "name": "@myns/mylib", "version": "1.0.0", "main": "./index.js" }
// @Filename: /home/src/workspaces/project/node_modules/@myns/mylib/index.js
export function /*target*/nsHelper() { return 42; }
// @Filename: /home/src/workspaces/project/index.ts
import { nsHelper } from "@myns/mylib";
nsHelper/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}
