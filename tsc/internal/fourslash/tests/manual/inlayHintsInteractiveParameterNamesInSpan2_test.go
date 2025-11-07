package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInlayHintsInteractiveParameterNamesInSpan2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo1 (a: number, b: number) {}
function foo2 (c: number, d: number) {}
function foo3 (e: number, f: number) {}
function foo4 (g: number, h: number) {}
function foo5 (i: number, j: number) {}
function foo6 (k: number, l: number) {}

foo1(/*a*/1, /*b*/2);
foo2(/*c*/1, /*d*/2);
foo3(/*e*/1, /*f*/2);
foo4(/*g*/1, /*h*/2);
foo5(/*i*/1, /*j*/2);
foo6(/*k*/1, /*l*/2);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	start := f.MarkerByName(t, "c")
	end := f.MarkerByName(t, "h")
	span := &lsproto.Range{Start: start.LSPosition, End: end.LSPosition}
	f.VerifyBaselineInlayHints(t, span, &lsutil.UserPreferences{IncludeInlayParameterNameHints: "literals"})
}
