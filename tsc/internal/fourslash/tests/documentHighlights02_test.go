package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocumentHighlights02(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @Filename: a.ts
function [|foo|] () {
	return 1;
}
[|foo|]();
// @Filename: b.ts
/// <reference path="a.ts"/>
[|foo|]();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToFile(t, "a.ts")
	f.GoToFile(t, "b.ts")
	f.VerifyBaselineDocumentHighlightsWithOptions(t, nil /*preferences*/, []string{"a.ts", "b.ts"}, ToAny(f.Ranges())...)
}
