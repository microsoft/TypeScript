package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGetOutliningForArrayDestructuring(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const[| [
    a,
    b,
    c
]|] =[| [
    1,
    2,
    3
]|];
const[| [
    [|[
        [|[
            [|[
                a,
                b,
                c
            ]|]
        ]|]
    ]|],
    [|[
        a1,
        b1,
        c1
    ]|]
]|] =[| [
    [|[
        [|[
            [|[
                1,
                2,
                3
            ]|]
        ]|]
    ]|],
    [|[
        1,
        2,
        3
    ]|]
]|]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
