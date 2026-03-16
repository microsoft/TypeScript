package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameBuiltinTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
const arr: /*1*/Array<number> = [];
const map1: /*2*/Map<string, number> = new Map();
const prom: /*3*/Promise<void> = Promise.resolve();
const str: /*4*/string = "hello";
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// All of these should fail because they're library/builtin types
	for _, marker := range []string{"1", "2", "3", "4"} {
		f.GoToMarker(t, marker)
		f.VerifyRenameFailed(t, nil /*preferences*/)
	}
}
