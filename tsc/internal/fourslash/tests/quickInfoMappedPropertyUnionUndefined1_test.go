package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoMappedPropertyUnionUndefined1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @exactOptionalPropertyTypes: true
// https://github.com/microsoft/TypeScript/issues/59948
type OptionalToUnionWithUndefined<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? T[K] : T[K] | undefined;
};
type Intermediate/*1*/ = OptionalToUnionWithUndefined<{ a?: string }>;
type Literal/*2*/ = { a?: string | undefined };
type Res1/*3*/ = Required<Intermediate>;
type Res2/*4*/ = Required<Literal>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "type Intermediate = {\n    a?: string | undefined;\n}", "")
	f.VerifyQuickInfoAt(t, "2", "type Literal = {\n    a?: string | undefined;\n}", "")
	f.VerifyQuickInfoAt(t, "3", "type Res1 = {\n    a: string | undefined;\n}", "")
	f.VerifyQuickInfoAt(t, "4", "type Res2 = {\n    a: string | undefined;\n}", "")
}
