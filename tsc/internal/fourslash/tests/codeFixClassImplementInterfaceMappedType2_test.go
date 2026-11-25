package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceMappedType2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type ListenerTemplate<T, S extends string, I extends string = "${1}"> = {
    [K in keyof T as K extends string
        ? S extends ` + "`" + `${infer F}${I}${infer R}` + "`" + ` ? ` + "`" + `${F}${K}${R}` + "`" + ` : K : K]
        : (listener: (payload: T[K]) => void) => void;
};
type ListenActionable<E> = ListenerTemplate<E, "add*Listener" | "remove*Listener", "*">;
type ClickEventSupport = ListenActionable<{ Click: 'some-click-event-payload' }>;

[|class C implements ClickEventSupport { }|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'ClickEventSupport'",
		NewRangeContent: `class C implements ClickEventSupport {
    addClickListener: (listener: (payload: "some-click-event-payload") => void) => void;
    removeClickListener: (listener: (payload: "some-click-event-payload") => void) => void;
}`,
		Index: 0,
	})
}

func TestCodeFixClassImplementInterfaceNonIdentifierNames(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/dep/index.d.ts
interface Hidden { x: number }
export { Hidden as "a\\u0062" };
export type I = { [K in "c\\u0064"]: Hidden };
// @Filename: /a.ts
import { I } from "dep";
class C implements I {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/a.ts")
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'I'",
		NewFileContent: `import { I } from "dep";
class C implements I {
    "c\\u0064": a\u0062;
}`,
		Index: 0,
	})
}
