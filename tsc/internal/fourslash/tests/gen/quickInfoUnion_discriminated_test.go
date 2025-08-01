package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoUnion_discriminated(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: quickInfoJsDocTags.ts
type U = A | B;

interface A {
    /** Kind A */
    kind: "a";
    /** Prop A */
    prop: number;
}

interface B {
    /** Kind B */
    kind: "b";
    /** Prop B */
    prop: string;
}

const u: U = {
    /*uKind*/kind: "a",
    /*uProp*/prop: 0,
}
const u2: U = {
    /*u2Kind*/kind: "bogus",
    /*u2Prop*/prop: 1,
};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "uKind", "(property) A.kind: \"a\"", "Kind A")
	f.VerifyQuickInfoAt(t, "uProp", "(property) A.prop: number", "Prop A")
	f.VerifyQuickInfoAt(t, "u2Kind", "(property) kind: \"bogus\"", "")
	f.VerifyQuickInfoAt(t, "u2Prop", "(property) prop: number", "")
}
