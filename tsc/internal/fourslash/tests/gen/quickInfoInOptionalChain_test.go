package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoInOptionalChain(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
interface A {
  arr: string[];
}

function test(a?: A): string {
  return a?.ar/*1*/r.length ? "A" : "B";
}

interface Foo { bar: { baz: string } };
declare const foo: Foo | undefined;

if (foo?.b/*2*/ar.b/*3*/az) {}

interface Foo2 { bar?: { baz: { qwe: string } } };
declare const foo2: Foo2;

if (foo2.b/*4*/ar?.b/*5*/az.q/*6*/we) {}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(property) A.arr: string[]", "")
	f.VerifyQuickInfoAt(t, "2", "(property) Foo.bar: {\n    baz: string;\n}", "")
	f.VerifyQuickInfoAt(t, "3", "(property) baz: string | undefined", "")
	f.VerifyQuickInfoAt(t, "4", "(property) Foo2.bar?: {\n    baz: {\n        qwe: string;\n    };\n} | undefined", "")
	f.VerifyQuickInfoAt(t, "5", "(property) baz: {\n    qwe: string;\n}", "")
	f.VerifyQuickInfoAt(t, "6", "(property) qwe: string | undefined", "")
}
