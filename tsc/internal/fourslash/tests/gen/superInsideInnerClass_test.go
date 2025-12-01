package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSuperInsideInnerClass(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Base {
	constructor(n: number) {
	}
}
class Derived extends Base {
	constructor() {
		class Nested {
			[super(/*1*/)] = 11111
		}
	}
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNoSignatureHelpForMarkers(t, "1")
}
