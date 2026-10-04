package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGoToDefinitionTaggedTemplateOverloads(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function /*defFNumber*/f(strs: TemplateStringsArray, x: number): void;
function /*defFBool*/f(strs: TemplateStringsArray, x: boolean): void;
function f(strs: TemplateStringsArray, x: number | boolean) {}

[|/*useFNumber*/f|]` + "`" + `${0}` + "`" + `;
[|/*useFBool*/f|]` + "`" + `${false}` + "`" + `;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "useFNumber", "useFBool")
}
