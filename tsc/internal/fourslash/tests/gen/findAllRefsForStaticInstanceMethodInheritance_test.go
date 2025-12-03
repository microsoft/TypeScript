package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllRefsForStaticInstanceMethodInheritance(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class X{
	/*0*/foo(): void{}
}

class Y extends X{
	static /*1*/foo(): void{}
}

class Z extends Y{
	static /*2*/foo(): void{}
	/*3*/foo(): void{}
}

const x = new X();
const y = new Y();
const z = new Z();
x.foo();
y.foo();
z.foo();
Y.foo();
Z.foo();`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "0", "1", "2", "3")
}
