package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationShorthandPropertyAssignment_00(t *testing.T) {
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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "classExpressionRef", "declaredClassRef")
}
