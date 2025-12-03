package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForGlobalsInExternalModule(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/var /*2*/topLevelVar = 2;
var topLevelVar2 = /*3*/topLevelVar;

/*4*/class /*5*/topLevelClass { }
var c = new /*6*/topLevelClass();

/*7*/interface /*8*/topLevelInterface { }
var i: /*9*/topLevelInterface;

/*10*/module /*11*/topLevelModule {
    export var x;
}
var x = /*12*/topLevelModule.x;

export = x;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12")
}
