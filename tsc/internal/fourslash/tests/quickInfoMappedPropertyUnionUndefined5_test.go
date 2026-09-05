package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoMappedPropertyUnionUndefined5(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// https://github.com/microsoft/TypeScript/issues/62325
type RequiredKeys<T extends object> = {
  [K in keyof Required<T>]: T[K];
};
type Foo = {
  a?: string;
  b?: number;
  c: string;
  d: boolean | undefined;
};
type Bar/*1*/ = RequiredKeys<Foo>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "type Bar = {\n    a: string | undefined;\n    b: number | undefined;\n    c: string;\n    d: boolean | undefined;\n}", "")
}
