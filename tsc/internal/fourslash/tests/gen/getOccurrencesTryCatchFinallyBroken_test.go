package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetOccurrencesTryCatchFinallyBroken(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `t /*1*/ry {
    t/*2*/ry {
    }
    ctch (x) {
    }

    tr {
    }
    fin/*3*/ally {
    }
}
c/*4*/atch (e) {
}
f/*5*/inally {
}

// Missing catch variable
t/*6*/ry {
}
catc/*7*/h {
}
/*8*/finally {
}

// Missing try entirely
cat/*9*/ch (x) {
}
final/*10*/ly {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, ToAny(f.Markers())...)
}
