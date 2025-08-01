package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoMappedTypeRecursiveInference(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: test.ts
interface A { a: A }
declare let a: A;
type Deep<T> = { [K in keyof T]: Deep<T[K]> }
declare function foo<T>(deep: Deep<T>): T;
const out/*1*/ = foo/*2*/(a);
out.a/*3*/
out.a.a/*4*/
out.a.a.a.a.a.a.a/*5*/

interface B { [s: string]: B }
declare let b: B;
const oub/*6*/ = foo/*7*/(b);
oub.b/*8*/
oub.b.b/*9*/
oub.b.a.n.a.n.a/*10*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "const out: {\n    a: {\n        a: ...;\n    };\n}", "")
	f.VerifyQuickInfoAt(t, "2", "function foo<{\n    a: {\n        a: ...;\n    };\n}>(deep: Deep<{\n    a: {\n        a: ...;\n    };\n}>): {\n    a: {\n        a: ...;\n    };\n}", "")
	f.VerifyQuickInfoAt(t, "3", "(property) a: {\n    a: {\n        a: ...;\n    };\n}", "")
	f.VerifyQuickInfoAt(t, "4", "(property) a: {\n    a: {\n        a: ...;\n    };\n}", "")
	f.VerifyQuickInfoAt(t, "5", "(property) a: {\n    a: {\n        a: ...;\n    };\n}", "")
	f.VerifyQuickInfoAt(t, "6", "const oub: {\n    [x: string]: ...;\n}", "")
	f.VerifyQuickInfoAt(t, "7", "function foo<{\n    [x: string]: ...;\n}>(deep: Deep<{\n    [x: string]: ...;\n}>): {\n    [x: string]: ...;\n}", "")
	f.VerifyQuickInfoAt(t, "8", "{\n    [x: string]: ...;\n}", "")
	f.VerifyQuickInfoAt(t, "9", "{\n    [x: string]: ...;\n}", "")
	f.VerifyQuickInfoAt(t, "10", "{\n    [x: string]: ...;\n}", "")
}
