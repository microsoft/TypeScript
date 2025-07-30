package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsDocAliasQuickInfo(t *testing.T) {
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
