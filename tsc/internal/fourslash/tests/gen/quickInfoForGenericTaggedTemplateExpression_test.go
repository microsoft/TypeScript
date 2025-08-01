package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForGenericTaggedTemplateExpression(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface T1 {}
class T2 {}
type T3 = "a" | "b";

declare function foo<T>(strings: TemplateStringsArray, ...values: T[]): void;

/*1*/foo<number>` + "`" + `` + "`" + `;
/*2*/foo<string | number>` + "`" + `` + "`" + `;
/*3*/foo<{ a: number }>` + "`" + `` + "`" + `;
/*4*/foo<T1>` + "`" + `` + "`" + `;
/*5*/foo<T2>` + "`" + `` + "`" + `;
/*6*/foo<T3>` + "`" + `` + "`" + `;
/*7*/foo` + "`" + `` + "`" + `;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "function foo<number>(strings: TemplateStringsArray, ...values: number[]): void", "")
	f.VerifyQuickInfoAt(t, "2", "function foo<string | number>(strings: TemplateStringsArray, ...values: (string | number)[]): void", "")
	f.VerifyQuickInfoAt(t, "3", "function foo<{\n    a: number;\n}>(strings: TemplateStringsArray, ...values: {\n    a: number;\n}[]): void", "")
	f.VerifyQuickInfoAt(t, "4", "function foo<T1>(strings: TemplateStringsArray, ...values: T1[]): void", "")
	f.VerifyQuickInfoAt(t, "5", "function foo<T2>(strings: TemplateStringsArray, ...values: T2[]): void", "")
	f.VerifyQuickInfoAt(t, "6", "function foo<T3>(strings: TemplateStringsArray, ...values: T3[]): void", "")
	f.VerifyQuickInfoAt(t, "7", "function foo<unknown>(strings: TemplateStringsArray, ...values: unknown[]): void", "")
}
