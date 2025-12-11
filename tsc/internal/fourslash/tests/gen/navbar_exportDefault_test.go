package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavbar_exportDefault(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.ts
export default class { }
// @Filename: b.ts
export default class C { }
// @Filename: c.ts
export default function { }
// @Filename: d.ts
export default function Func { }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "a.ts")
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "b.ts")
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "c.ts")
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "d.ts")
	f.VerifyBaselineDocumentSymbol(t)
}
