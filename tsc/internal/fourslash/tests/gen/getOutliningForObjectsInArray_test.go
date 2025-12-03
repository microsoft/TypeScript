package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOutliningForObjectsInArray(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const x =[| [
    [|{ a: 0 }|],
    [|{ b: 1 }|],
    [|{ c: 2 }|]
]|];

const y =[| [
    [|{
        a: 0
    }|],
    [|{
        b: 1
    }|],
    [|{
        c: 2
    }|]
]|];

const w =[| [
    [|[ 0 ]|],
    [|[ 1 ]|],
    [|[ 2 ]|]
]|];

const z =[| [
    [|[
        0
    ]|],
    [|[
        1
    ]|],
    [|[
        2
    ]|]
]|];

const z =[| [
    [|[
        [|{ hello: 0 }|]
    ]|],
    [|[
        [|{ hello: 3 }|]
    ]|],
    [|[
        [|{ hello: 5 }|],
        [|{ hello: 7 }|]
    ]|]
]|];`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOutliningSpans(t)
}
