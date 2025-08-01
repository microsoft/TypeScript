package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestContextuallyTypedObjectLiteralMethodDeclarationParam01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noImplicitAny: true
interface A {
    numProp: number;
}

interface B  {
    strProp: string;
}

interface Foo {
    method1(arg: A): void;
    method2(arg: B): void;
}

function getFoo1(): Foo {
    return {
        method1(/*param1*/arg) {
            arg.numProp = 10;
        },
        method2(/*param2*/arg) {
            arg.strProp = "hello";
        }
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "param1", "(parameter) arg: A", "")
	f.VerifyQuickInfoAt(t, "param2", "(parameter) arg: B", "")
}
