package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSquiggleIllegalSubclassOverride(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
class Foo {
    public x: number;
}

class Bar extends Foo {
    public /*1*/x/*2*/: string = 'hi';
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyErrorExistsBetweenMarkers(t, "1", "2")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
