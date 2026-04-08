package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceFindImplementationNonNodeModules(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When a .d.ts file is not in node_modules and has no sibling .js,
	// source definition falls back to the standard definition provider
	// and navigates to the .d.ts declaration.
	const content = `// @moduleResolution: bundler
// @declaration: true
// @Filename: /home/src/workspaces/project/lib/helper.d.ts
export declare function helper(): string;
// @Filename: /home/src/workspaces/project/index.ts
import { /*usage*/helper } from "./lib/helper";
helper();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "usage")
}
