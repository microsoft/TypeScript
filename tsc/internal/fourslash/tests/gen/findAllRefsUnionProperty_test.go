package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsUnionProperty(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type T =
    | { /*t0*/type: "a", /*p0*/prop: number }
    | { /*t1*/type: "b", /*p1*/prop: string };
const tt: T = {
    /*t2*/type: "a",
    /*p2*/prop: 0,
};
declare const t: T;
if (t./*t3*/type === "a") {
    t./*t4*/type;
} else {
    t./*t5*/type;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "t0", "t1", "t3", "t4", "t5", "t2", "p0", "p1", "p2")
}
