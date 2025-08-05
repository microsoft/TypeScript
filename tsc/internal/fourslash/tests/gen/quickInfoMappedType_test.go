package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoMappedType(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
  /** m documentation */ m(): void;
}
declare const o: { [K in keyof I]: number };
o.m/*0*/;

declare const p: { [K in keyof I]: I[K] };
p.m/*1*/;

declare const q: Pick<I, "m">;
q.m/*2*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "0", "(property) m: number", "m documentation")
	f.VerifyQuickInfoAt(t, "1", "(method) m(): void", "m documentation")
	f.VerifyQuickInfoAt(t, "2", "(method) m(): void", "m documentation")
}
