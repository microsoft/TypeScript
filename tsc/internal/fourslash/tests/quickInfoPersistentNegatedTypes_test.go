package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoPersistentNegatedTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
function nonString(value: unknown) {
    if (typeof value === "string") throw new Error();
    const /*constant*/constant = value;
    let /*variable*/variable = value;
    return value;
}
const /*result*/result = nonString(42);
const /*predicate*/predicate = (value: unknown) => typeof value !== "string";
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyQuickInfoAt(t, "constant", "const constant: not string", "")
	f.VerifyQuickInfoAt(t, "variable", "let variable: not string", "")
	f.VerifyQuickInfoAt(t, "result", "const result: not string", "")
	f.VerifyQuickInfoAt(t, "predicate", "const predicate: (value: unknown) => value is not string", "")
}
