package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationInterfaceMethod_10(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface BaseFoo {
	 hello(): void;
}

interface Foo extends BaseFoo {
	 aloha(): void;
}

interface Bar {
 	 hello(): void;
 	 goodbye(): void;
}

class FooImpl implements Foo {
 	 [|hello|]() {/**FooImpl*/}
 	 aloha() {}
}

class BaseFooImpl implements BaseFoo {
 	 hello() {/**BaseFooImpl*/}    // Should not show up
}

class BarImpl implements Bar {
	 [|hello|]() {/**BarImpl*/}
	 goodbye() {}
}

class FooAndBarImpl implements Foo, Bar {
	 [|hello|]() {/**FooAndBarImpl*/}
	 aloha() {}
	 goodbye() {}
}

function someFunction(x: Foo | Bar) {
	 x.he/*function_call0*/llo();
}

function anotherFunction(x: Foo & Bar) {
	 x.he/*function_call1*/llo();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToImplementation(t, "function_call0", "function_call1")
}
