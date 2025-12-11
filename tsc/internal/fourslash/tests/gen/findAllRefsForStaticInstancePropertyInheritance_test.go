package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsForStaticInstancePropertyInheritance(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class X{
	/*0*/foo:any
}

class Y extends X{
	static /*1*/foo:any
}

class Z extends Y{
	static /*2*/foo:any
	/*3*/foo:any
}

const x = new X();
const y = new Y();
const z = new Z();
x./*4*/foo;
y./*5*/foo;
z./*6*/foo;
Y./*7*/foo;
Z./*8*/foo;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2", "3", "4", "5", "6", "7", "8")
}
