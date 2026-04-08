package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceRequireCall(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// findContainingModuleSpecifier handles require() calls.
	const content = `// @moduleResolution: bundler
// @allowJs: true
// @checkJs: true
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function helper(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
exports./*target*/helper = function() { return "ok"; };
// @Filename: /home/src/workspaces/project/index.js
const { /*importName*/helper } = require("pkg");
helper/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName", "usage")
}

func TestGoToSourceDynamicImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// findContainingModuleSpecifier handles dynamic import() calls.
	const content = `// @moduleResolution: bundler
// @target: esnext
// @module: esnext
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export declare function dynHelper(): string;
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
export function /*target*/dynHelper() { return "dynamic"; }
// @Filename: /home/src/workspaces/project/index.ts
async function main() {
    const mod = await import("pkg");
    mod./*usage*/dynHelper();
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}
