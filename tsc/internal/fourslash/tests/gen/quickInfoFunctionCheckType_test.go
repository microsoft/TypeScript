package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoFunctionCheckType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export type /**/Tail<T extends any[]> = ((...t: T) => void) extends (h: any, ...rest: infer R) => void ? R : never;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "type Tail<T extends any[]> = ((...t: T) => void) extends (h: any, ...rest: infer R) => void ? R : never", "")
}
