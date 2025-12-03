package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestReferencesForInheritedProperties(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface interface1 {
    /*1*/doStuff(): void;
}

interface interface2  extends interface1{
    /*2*/doStuff(): void;
}

class class1 implements interface2 {
    /*3*/doStuff() {

    }
}

class class2 extends class1 {

}

var v: class2;
v./*4*/doStuff();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2", "3", "4")
}
