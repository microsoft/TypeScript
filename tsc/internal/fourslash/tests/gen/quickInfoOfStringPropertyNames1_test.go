package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOfStringPropertyNames1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface foo {
    "foo bar": string;
}
var f: foo;
var /*1*/r = f['foo bar'];
class bar {
    'hello world': number;
    '1': string;
    constructor() {
        bar['hello world'] = 3;
    }
}
var b: bar;
var /*2*/r2 = b["hello world"];
var /*3*/r4 = b['1'];
var /*4*/r5 = b[1];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var r: string", "")
	f.VerifyQuickInfoAt(t, "2", "var r2: number", "")
	f.VerifyQuickInfoAt(t, "3", "var r4: string", "")
	f.VerifyQuickInfoAt(t, "4", "var r5: string", "")
}
