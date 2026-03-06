package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyUnclosedTemplateExprNoCrash1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Regression test for a crash in prepareCallHierarchy caused by parser error
	// recovery: when a template expression is truncated mid-call (e.g. `${format`
	// without closing `)`), the parser misinterprets the `class` keyword in
	// subsequent HTML template literals as a TypeScript class declaration.
	// The resulting anonymous ClassDeclaration (no name, no `default` modifier)
	// previously caused a "Expected call hierarchy declaration to have a reference
	// node" assertion failure.
	const content = "// @Filename: /main.ts\n" +
		"function updateBadge() {\n" +
		"    const header = `<div class=\"sub\">${format`;\n" +
		"    const badge = `<div /*1*/class=\"badge\">`;\n" +
		"}"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifyBaselineCallHierarchy(t)
}
