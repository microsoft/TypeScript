package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationShorthandPropertyAssignment_00(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
    someFunction(): void;
}

interface FooConstructor {
    new (): Foo
}

interface Bar {
    Foo: FooConstructor;
}

var x = class /*classExpression*/Foo {
    createBarInClassExpression(): Bar {
        return {
            Fo/*classExpressionRef*/o
        };
    }

    someFunction() {}
}

class /*declaredClass*/Foo {

}

function createBarUsingClassDeclaration(): Bar {
    return {
        Fo/*declaredClassRef*/o
    };
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "classExpressionRef", "declaredClassRef")
}
