package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinition_sourcePhase(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @target: esnext

// @filename: /a.wasm
wasm

// @filename: /b.ts
import source b from "./a.wasm";
[|/*bUse*/b|];

// @filename: /c.ts
import source c from "./a.wasm";
[|/*cUse*/c|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "bUse", "cUse")
	f.VerifyBaselineFindAllReferences(t, "bUse", "cUse")
}
