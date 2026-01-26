package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatSpaceAfterImplementsExtends(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C1 implements Array<string>{
}

class C2 implements Number{
}

class C3 extends Array<string>{
}

class C4 extends Number{
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, `class C1 implements Array<string> {
}

class C2 implements Number {
}

class C3 extends Array<string> {
}

class C4 extends Number {
}`)
}
