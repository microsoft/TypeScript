package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestQuickInfoGenericDefaultInReentrantCallResolution(t *testing.T) {
	t.Parallel()
	const content = `// @target: es2015
// @strict: true
declare function fetcher<D>(cfg: unknown): Promise<D>;
type Routes<R> = R extends "x" ? { IN: { v: number }; OUT: string } : never;
function executeFetch<R extends string, T = Routes<R>>(
    route: R,
    body?: T extends Record<"IN", any> ? T["IN"] : never,
) {
    return fetcher<T extends Record<"OUT", any> ? T["OUT"] : T>({ route, body });
}
declare function useCallback<T extends Function>(cb: T, deps: unknown[]): T;
export const /*callback*/cb = useCallback((data: { v: number }) => {
    return executeFetch("x", /*argument*/data);
}, []);
export const check: Promise<string> = cb({ v: 1 });`
	for _, first := range []string{"callback", "argument", "diagnostics"} {
		t.Run(first, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			callbackInfo := "const cb: (data: {\n    v: number;\n}) => Promise<string>"
			argumentInfo := "(parameter) data: {\n    v: number;\n}"
			switch first {
			case "callback":
				f.VerifyQuickInfoAt(t, "callback", callbackInfo, "")
			case "argument":
				f.VerifyQuickInfoAt(t, "argument", argumentInfo, "")
			case "diagnostics":
				f.VerifyNoErrors(t)
			}
			f.VerifyQuickInfoAt(t, "callback", callbackInfo, "")
			f.VerifyQuickInfoAt(t, "argument", argumentInfo, "")
			f.VerifyNoErrors(t)
		})
	}
}
