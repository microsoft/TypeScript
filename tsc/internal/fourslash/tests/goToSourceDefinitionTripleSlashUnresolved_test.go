package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToSourceDefinitionUnresolvedTripleSlash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// When the cursor is on a triple-slash reference directive that doesn't
	// resolve to a file, source definition returns empty results.
	const content = `// @Filename: /home/src/workspaces/project/index.ts
/// <reference /*marker*/path="nonexistent.ts" />
export {};`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToSourceDefinition(t, "marker")
}
