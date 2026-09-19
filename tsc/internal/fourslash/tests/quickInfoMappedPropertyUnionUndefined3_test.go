package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoMappedPropertyUnionUndefined3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// https://github.com/microsoft/TypeScript/issues/60411
// @strict: true
type UnsetUndefinedToOblivion<T> = { [P in keyof T]-?: T[P] | undefined };
type SetUndefined<T> = { [P in keyof T]: T[P] | undefined };
type TheWhat/**/ = SetUndefined<UnsetUndefinedToOblivion<{ a?: 1 }>>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "type TheWhat = {\n    a: 1 | undefined;\n}", "")
}
