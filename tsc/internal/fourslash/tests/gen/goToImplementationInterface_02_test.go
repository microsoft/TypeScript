package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterface_02(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Fo/*interface_definition*/o { hello: () => void }

let x: number = 9;

function createFoo(): Foo {
    if (x === 2) {
        return [|{
            hello() {}
        }|];
    }
    return [|{
        hello() {}
    }|];
}

let createFoo2 = (): Foo => [|({hello() {}})|];

function createFooLike() {
    return {
        hello() {}
    };
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "interface_definition")
}
