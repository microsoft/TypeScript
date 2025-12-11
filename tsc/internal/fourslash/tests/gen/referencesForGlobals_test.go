package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForGlobals(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: referencesForGlobals_1.ts
/*1*/var /*2*/global = 2;

class foo {
    constructor (public global) { }
    public f(global) { }
    public f2(global) { }
}

class bar {
    constructor () {
        var n = /*3*/global;

        var f = new foo('');
        f.global = '';
    }
}

var k = /*4*/global;
// @Filename: referencesForGlobals_2.ts
var m = /*5*/global;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5")
}
