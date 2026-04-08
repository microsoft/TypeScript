package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceNestedNodeModules(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When a .d.ts file is inside nested node_modules (more than one /node_modules/
	// segment), the findImplementationFileFromDtsFileName should bail out rather
	// than trying to resolve, since the package name extraction may be incorrect.
	// The module specifier path should still work though.
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/outer/package.json
{ "name": "outer", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/outer/index.d.ts
export { inner } from "./node_modules/inner/index";
// @Filename: /home/src/workspaces/project/node_modules/outer/index.js
export { inner } from "./node_modules/inner/index.js";
// @Filename: /home/src/workspaces/project/node_modules/outer/node_modules/inner/package.json
{ "name": "inner", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/outer/node_modules/inner/index.d.ts
export declare function inner(): string;
// @Filename: /home/src/workspaces/project/node_modules/outer/node_modules/inner/index.js
export function /*target*/inner() { return "ok"; }
// @Filename: /home/src/workspaces/project/index.ts
import { /*importName*/inner } from "outer";
inner/*usage*/();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "importName", "usage")
}
