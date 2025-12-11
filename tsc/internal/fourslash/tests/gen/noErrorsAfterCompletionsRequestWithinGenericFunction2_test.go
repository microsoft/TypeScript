package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNoErrorsAfterCompletionsRequestWithinGenericFunction2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true

// repro from #50818#issuecomment-1278324638

declare function func<T extends { foo: 1 }>(arg: T): void;
func({ foo: 1, bar/*1*/: 1 });`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.Insert(t, "2")
	f.VerifyCompletions(t, nil, nil)
	f.VerifyNoErrors(t)
}
