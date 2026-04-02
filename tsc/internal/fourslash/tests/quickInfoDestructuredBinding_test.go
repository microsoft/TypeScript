package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoDestructuredBinding(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `
function f({ /*1*/x }: { x: number }) {}
function g([/*2*/y]: number[]) {}
function h({ a: { /*3*/b } }: { a: { b: string } }) {}
const { /*4*/c } = { c: 42 };
let { /*5*/d } = { d: "hello" };
var { /*6*/e } = { e: true };
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Destructured object binding parameters should show "(parameter)" not "var"
	f.VerifyQuickInfoAt(t, "1", "(parameter) x: number", "")
	// Destructured array binding parameters should show "(parameter)" not "var"
	f.VerifyQuickInfoAt(t, "2", "(parameter) y: number", "")
	// Nested destructured parameters should also show "(parameter)"
	f.VerifyQuickInfoAt(t, "3", "(parameter) b: string", "")
	// Destructured const/let/var bindings should show their proper keyword
	f.VerifyQuickInfoAt(t, "4", "const c: number", "")
	f.VerifyQuickInfoAt(t, "5", "let d: string", "")
	f.VerifyQuickInfoAt(t, "6", "var e: boolean", "")
}
