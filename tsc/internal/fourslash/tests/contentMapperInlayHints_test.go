package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperInlayHints(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// original: (+ 1 2 "oops")
	// virtual:  add(1, 2, "oops");
	//           [-) [) [) [----) mapped spans
	f, done := newContentMapperFourslash(t, `// @Filename: /app.lisp
(+ 1 2 "oops")

// @Filename: /main.ts
declare function add(a: number, b: number, c: string): number;
`, contentmappertest.LispMapper, ".lisp")
	defer done()

	f.GoToFile(t, "/app.lisp")
	f.VerifyBaselineInlayHints(t, nil /*span*/, &lsutil.UserPreferences{InlayHints: lsutil.InlayHintsPreferences{IncludeInlayParameterNameHints: lsutil.IncludeInlayParameterNameHintsAll}})
}
