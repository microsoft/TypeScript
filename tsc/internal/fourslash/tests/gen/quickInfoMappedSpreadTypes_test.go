package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoMappedSpreadTypes(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    /** Doc */
    bar: number;
}

const f: Foo = { bar: 0 };
f./*f*/bar;

const f2: { [TKey in keyof Foo]: string } = { bar: "0" };
f2./*f2*/bar;

const f3 = { ...f };
f3./*f3*/bar;

const f4 = { ...f2 };
f4./*f4*/bar;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "f")
	f.VerifyQuickInfoIs(t, "(property) Foo.bar: number", "Doc")
	f.GoToMarker(t, "f2")
	f.VerifyQuickInfoIs(t, "(property) bar: string", "Doc")
	f.GoToMarker(t, "f3")
	f.VerifyQuickInfoIs(t, "(property) Foo.bar: number", "Doc")
	f.GoToMarker(t, "f4")
	f.VerifyQuickInfoIs(t, "(property) bar: string", "Doc")
}
