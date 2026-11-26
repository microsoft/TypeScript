package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFindAllRefsLateBoundMemberQueryOrder(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// I and J have the same shape. Each declares a member whose name comes
	// from a property of its own instantiation, so resolving the members of
	// I<"a"> re-enters the declared members of I. Every `a` below refers to
	// the member `[i1.x]` of I, and every `c` to `[j1.x]` of J. Quick info at
	// i1.x resolves I<"a"> first; quick info at j2.c resolves J<"d"> first.
	const content = `declare const i1: I<"a">;
i1./*i1X*/x;
interface I<T extends "a" | "b"> {
    x: T;
    [i1.x]: "b";
}
declare const i2: I<"b">;
export const v1 = i2.a;
export const v2 = i1.a;
export const o1: I<"b"> = { x: "b", /*a*/a: "b" };

declare const j1: J<"c">;
j1.x;
interface J<T extends "c" | "d"> {
    x: T;
    [j1.x]: "d";
}
declare const j2: J<"d">;
export const w1 = j2./*j2C*/c;
export const w2 = j1.c;
export const o2: J<"d"> = { x: "d", /*c*/c: "d" };`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "i1X")
	f.VerifyQuickInfoExists(t)
	f.GoToMarker(t, "j2C")
	f.VerifyQuickInfoExists(t)
	f.VerifyBaselineFindAllReferences(t, "a", "c")
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "a", "c")
}
