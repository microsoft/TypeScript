package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFindReferencesAcrossMultipleProjectsVS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: a.ts
/*1*/var /*2*/x: number;
//@Filename: b.ts
/// <reference path="a.ts" />
/*3*/x++;
//@Filename: c.ts
/// <reference path="a.ts" />
/*4*/x++;`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineVSFindAllReferences(t, "1", "2", "3", "4")
}
