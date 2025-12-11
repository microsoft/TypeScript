package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionConstructorOfClassExpression01(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = class C {
    /*definition*/constructor() {
        var other = new [|/*xusage*/C|];
    }
}

var y = class C extends x {
    constructor() {
        super();
        var other = new [|/*yusage*/C|];
    }
}
var z = class C extends x {
    m() {
        return new [|/*zusage*/C|];
    }
}

var x1 = new [|/*cref*/C|]();
var x2 = new [|/*xref*/x|]();
var y1 = new [|/*yref*/y|]();
var z1 = new [|/*zref*/z|]();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "xusage", "yusage", "zusage", "cref", "xref", "yref", "zref")
}
