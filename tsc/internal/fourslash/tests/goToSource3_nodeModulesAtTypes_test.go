package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToSource3_nodeModulesAtTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/foo/package.json
{ "name": "foo", "version": "1.0.0", "main": "./lib/main.js" }
// @Filename: /home/src/workspaces/project/node_modules/foo/lib/main.js
export const /*end*/a = "a";
// @Filename: /home/src/workspaces/project/node_modules/@types/foo/package.json
{ "name": "@types/foo", "version": "1.0.0", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/@types/foo/index.d.ts
export declare const a: string;
// @Filename: /home/src/workspaces/project/index.ts
import { a } from "foo";
[|a/*start*/|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyBaselineGoToSourceDefinition(t, "start")
}
