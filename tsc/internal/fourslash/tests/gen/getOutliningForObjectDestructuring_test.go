package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOutliningForObjectDestructuring(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const[| {
    a,
    b,
    c
}|] =[| {
    a: 1,
    b: 2,
    c: 3
}|]
const[| {
    a:[| {
        a_1,
        a_2,
        a_3:[| {
            a_3_1,
            a_3_2,
            a_3_3,
        }|],
    }|],
    b,
    c
}|] =[| {
    a:[| {
        a_1: 1,
        a_2: 2,
        a_3:[| {
            a_3_1: 1,
            a_3_2: 1,
            a_3_3: 1
        }|],
    }|],
    b: 2,
    c: 3
}|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
