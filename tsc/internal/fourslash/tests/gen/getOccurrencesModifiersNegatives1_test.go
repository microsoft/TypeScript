package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesModifiersNegatives1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C {
    [|{| "count": 3 |}export|] foo;
    [|{| "count": 3 |}declare|] bar;
    [|{| "count": 3 |}export|] [|{| "count": 3 |}declare|] foobar;
    [|{| "count": 3 |}declare|] [|{| "count": 3 |}export|] barfoo;

    constructor([|{| "count": 9 |}export|] conFoo,
                [|{| "count": 9 |}declare|] conBar,
                [|{| "count": 9 |}export|] [|{| "count": 9 |}declare|] conFooBar,
                [|{| "count": 9 |}declare|] [|{| "count": 9 |}export|] conBarFoo,
                [|{| "count": 4 |}static|] sue,
                [|{| "count": 4 |}static|] [|{| "count": 9 |}export|] [|{| "count": 9 |}declare|] sueFooBar,
                [|{| "count": 4 |}static|] [|{| "count": 9 |}declare|] [|{| "count": 9 |}export|] sueBarFoo,
                [|{| "count": 9 |}declare|] [|{| "count": 4 |}static|] [|{| "count": 9 |}export|] barSueFoo) {
    }
}

module m {
    [|{| "count": 0 |}static|] a;
    [|{| "count": 0 |}public|] b;
    [|{| "count": 0 |}private|] c;
    [|{| "count": 0 |}protected|] d;
    [|{| "count": 0 |}static|] [|{| "count": 0 |}public|] [|{| "count": 0 |}private|] [|{| "count": 0 |}protected|] e;
    [|{| "count": 0 |}public|] [|{| "count": 0 |}static|] [|{| "count": 0 |}protected|] [|{| "count": 0 |}private|] f;
    [|{| "count": 0 |}protected|] [|{| "count": 0 |}static|] [|{| "count": 0 |}public|] g;
}
[|{| "count": 0 |}static|] a;
[|{| "count": 0 |}public|] b;
[|{| "count": 0 |}private|] c;
[|{| "count": 0 |}protected|] d;
[|{| "count": 0 |}static|] [|{| "count": 0 |}public|] [|{| "count": 0 |}private|] [|{| "count": 0 |}protected|] e;
[|{| "count": 0 |}public|] [|{| "count": 0 |}static|] [|{| "count": 0 |}protected|] [|{| "count": 0 |}private|] f;
[|{| "count": 0 |}protected|] [|{| "count": 0 |}static|] [|{| "count": 0 |}public|] g;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Ranges())...)
}
