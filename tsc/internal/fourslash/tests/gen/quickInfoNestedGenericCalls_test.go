package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoNestedGenericCalls(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
/*1*/m({ foo: /*2*/$("foo") });
m({ foo: /*3*/$("foo") });
declare const m: <S extends string>(s: { [_ in S]: { $: NoInfer<S> } }) => void
declare const $: <S, T extends S>(s: T) => { $: S }
type NoInfer<T> = [T][T extends any ? 0 : never];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "const m: <\"foo\">(s: {\n    foo: {\n        $: \"foo\";\n    };\n}) => void", "")
	f.VerifyQuickInfoAt(t, "2", "const $: <unknown, string>(s: string) => {\n    $: unknown;\n}", "")
	f.VerifyQuickInfoAt(t, "3", "const $: <unknown, string>(s: string) => {\n    $: unknown;\n}", "")
}
