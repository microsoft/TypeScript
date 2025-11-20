package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationShorthandPropertyAssignment_02(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Foo {
	 hello(): void;
}

function createFoo(): Foo {
    return {
         hello
    };

    function [|hello|]() {}
}

function whatever(x: Foo) {
     x.h/*function_call*/ello();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "function_call")
}
