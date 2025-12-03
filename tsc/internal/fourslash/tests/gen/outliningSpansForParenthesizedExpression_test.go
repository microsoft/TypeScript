package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOutliningSpansForParenthesizedExpression(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const a = [|(
    true
        ? true
        : false
            ? true
            : false
)|];

const b = ( 1 );

const c = [|(
    1
)|];

( 1 );

[|(
    [|(
        [|(
            1
        )|]
    )|]
)|];

[|(
    [|(
        ( 1 )
    )|]
)|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
