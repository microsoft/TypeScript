package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDestructuredIntersectionJSDoc(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
type X = {
    /** Description of a. */
    a: {}
}

type Y = X & { a: {} }

declare function f({ /*1*/a }: Y): void
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}

func TestDestructuredIntersectionJSDocVariable(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
type X = {
    /** Description of a. */
    a: {}
}

type Y = X & { a: {} }

declare const y: Y;
const { /*1*/a } = y;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
