package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_weirdDefaultSynthesis(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @esModuleInterop: false
// @allowSyntheticDefaultImports: false
// @Filename: /collection.ts
class Collection {
  public static readonly default: typeof Collection = Collection;
}
export = Collection as typeof Collection & { default: typeof Collection };
// @Filename: /index.ts
Colle/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "Collection",
		Source:      "./collection",
		Description: "Add import from \"./collection\"",
		NewFileContent: new(`import Collection = require("./collection");

Colle`),
	})
}
