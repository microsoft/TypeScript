package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDisplayPartsParameters(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** @return *crunch* */
function /*1*/foo(/*2*/param: string, /*3*/optionalParam?: string, /*4*/paramWithInitializer = "hello", .../*5*/restParam: string[]) {
    /*6*/param = "Hello";
    /*7*/optionalParam = "World";
    /*8*/paramWithInitializer = "Hello";
    /*9*/restParam[0] = "World";
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
