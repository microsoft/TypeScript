package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxQuickInfo5(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
// @jsx: preserve
// @noLib: true
declare function ComponentWithTwoAttributes<K,V>(l: {key1: K, value: V}): JSX.Element;
function Baz<T,U>(key1: T, value: U) {
    let a0 = <ComponentWi/*1*/thTwoAttributes k/*2*/ey1={key1} val/*3*/ue={value} />
    let a1 = <ComponentWithTwoAttributes {...{key1, value: value}} key="Component" />
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "function ComponentWithTwoAttributes<T, U>(l: {\n    key1: T;\n    value: U;\n}): JSX.Element", "")
	f.VerifyQuickInfoAt(t, "2", "(property) key1: T", "")
	f.VerifyQuickInfoAt(t, "3", "(property) value: U", "")
}
