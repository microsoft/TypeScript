package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestIncrementalParsingTopLevelAwait2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @target: esnext
// @module: esnext
// @Filename: ./foo.ts
export {};
/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.GoToMarker(t, "1")
	f.Insert(t, "await(1);")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.ReplaceLine(t, 1, "")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
}
