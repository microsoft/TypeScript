package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixConvertToTypeOnlyImportPreservesComments(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @verbatimModuleSyntax: true
// @Filename: /foo.ts
export type foo = "foo";
// @Filename: /index.ts
// upper comment
/*left comment*/ import { fo/**/o } from "./foo"; // right comment
// lower comment`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Use 'import type'",
		NewFileContent: `// upper comment
/*left comment*/ import type { foo } from "./foo"; // right comment
// lower comment`,
		Index: 0,
	})
}
