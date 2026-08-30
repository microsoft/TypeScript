package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoMappedTypeOptionalPropertyExplicitUndefined(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
type X = { x?: number | undefined };
type /*Y*/Y = { [K in keyof X]: X[K] };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "Y", "type Y = {\n    x?: number | undefined;\n}", "")
}

func TestQuickInfoMappedTypeOptionalPropertyExplicitUndefinedExactOptionalPropertyTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @exactOptionalPropertyTypes: true
type X = { x?: number | undefined };
type /*Y*/Y = { [K in keyof X]: X[K] };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "Y", "type Y = {\n    x?: number | undefined;\n}", "")
}

func TestQuickInfoMappedTypeRequiredPropertyExplicitUndefinedExactOptionalPropertyTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @exactOptionalPropertyTypes: true
type X = { x?: number | undefined };
type /*Y*/Y = { [K in keyof X]-?: X[K] };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "Y", "type Y = {\n    x: number | undefined;\n}", "")
}

func TestQuickInfoMappedTypeOptionalInferredPropertyExplicitUndefined(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
class C { x? = 1 as number }
type M<T> = { [K in keyof T]: T[K] | undefined };
type /*Y*/Y = M<C>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "Y", "type Y = {\n    x?: number | undefined;\n}", "")
}

func TestQuickInfoMappedTypeOptionalInferredPropertyExplicitUndefinedExactOptionalPropertyTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @exactOptionalPropertyTypes: true
class C { x? = 1 as number }
type M<T> = { [K in keyof T]: T[K] | undefined };
type /*Y*/Y = M<C>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "Y", "type Y = {\n    x?: number | undefined;\n}", "")
}
