package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperDiagnosticCodeDoesNotSelectTypeScriptFix(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /app.box
export function f/*query*/oo() { return 1; }
`, contentmappertest.DiagnosticCodeCollisionMapper, ".box")
	defer done()

	f.GoToMarker(t, "query")
	f.VerifyCodeFixNotAvailable(t)
}
