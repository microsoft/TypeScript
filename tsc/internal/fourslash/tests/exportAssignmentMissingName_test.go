package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExportAssignmentMissingName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Regression test for crash when export= has an incomplete/missing expression
	// (e.g. "export = " with a trailing space). The SelectionRange must not fall
	// outside the document symbol's Range.
	const content = `export = `
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
