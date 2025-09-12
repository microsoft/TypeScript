package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxGoToDefinitionIntrinsics(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
declare module JSX {
    interface Element { }
    interface IntrinsicElements {
        /*dt*/div: {
            /*pt*/name?: string;
            isOpen?: boolean;
        };
        /*st*/span: { n: string; };
    }
}
var x = <[|di/*ds*/v|] />;
var y = <[|s/*ss*/pan|] />;
var z = <div [|na/*ps*/me|]='hello' />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "ds", "ss", "ps")
}
