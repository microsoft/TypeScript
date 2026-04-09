package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionPreferSourceDefinition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/a.js
export const /*sourceTarget*/a = "a";
// @Filename: /home/src/workspaces/project/a.d.ts
export declare const /*dtsTarget*/a: string;
// @Filename: /home/src/workspaces/project/index.ts
import { a } from "./a";
a/*start*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// 1. Regular go-to-definition: goes to the .d.ts file
	f.VerifyBaselineGoToDefinition(t, false /*includeOriginalSelectionRange*/, "start")

	// 2. Go-to-source-definition: goes to the .js file
	f.VerifyBaselineGoToSourceDefinition(t, "start")

	// 3. Go-to-definition with preferGoToSourceDefinition: goes to the .js file, same as source definition
	f.Configure(t, lsutil.UserPreferences{PreferGoToSourceDefinition: true})
	f.VerifyBaselineGoToDefinition(t, false /*includeOriginalSelectionRange*/, "start")
}

func TestGoToDefinitionPreferSourceDefinitionFallback(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{ "name": "pkg", "main": "./index.js", "types": "./index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.d.ts
export interface Config {
    enabled: boolean;
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/index.js
exports.makeConfig = () => ({ enabled: true });
// @Filename: /home/src/workspaces/project/index.ts
import type { Config } from "pkg";
let value: /*start*/Config;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// With preferGoToSourceDefinition, when no source .js definition exists for a type-only symbol,
	// go-to-definition should fall back to the .d.ts definition.
	f.Configure(t, lsutil.UserPreferences{PreferGoToSourceDefinition: true})
	f.VerifyBaselineGoToDefinition(t, false /*includeOriginalSelectionRange*/, "start")
}
