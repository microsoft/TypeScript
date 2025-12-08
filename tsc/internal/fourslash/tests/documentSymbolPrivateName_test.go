package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDocumentSymbolPrivateName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: first.ts
class A {
  #foo() {
    class B {
      #bar() {   
         function baz () {
         }
      }
    }
  }
}

class B {
	constructor(private prop: string) {}
}

// @Filename: second.ts
class Foo {
	#privateProp: string;
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
	f.GoToFile(t, "second.ts")
	f.VerifyBaselineDocumentSymbol(t)
}
