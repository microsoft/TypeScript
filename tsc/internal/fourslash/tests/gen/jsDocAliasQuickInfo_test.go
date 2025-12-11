package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocAliasQuickInfo(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /jsDocAliasQuickInfo.ts
/**
 * Comment
 * @type {number}
 */
export /*1*/default 10;
// @Filename: /test.ts
export { /*2*/default as /*3*/test } from "./jsDocAliasQuickInfo";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
