package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestNavigationBarItemsMultilineStringIdentifiers2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f(p1: () => any, p2: string) { }
f(() => { }, ` + "`" + `line1\
line2\
line3` + "`" + `);

class c1 {
    const a = ' ''line1\
        line2';
}

f(() => { }, ` + "`" + `unterminated backtick 1
unterminated backtick 2
unterminated backtick 3`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
