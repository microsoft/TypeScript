package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormattingConditionalTypes(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*L1*/type Diff1<T, U> = T extends U?never:T;
/*L2*/type Diff2<T, U> = T    extends    U  ?    never   :     T;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.GoToMarker(t, "L1")
	f.VerifyCurrentLineContent(t, `type Diff1<T, U> = T extends U ? never : T;`)
	f.GoToMarker(t, "L2")
	f.VerifyCurrentLineContent(t, `type Diff2<T, U> = T extends U ? never : T;`)
}
