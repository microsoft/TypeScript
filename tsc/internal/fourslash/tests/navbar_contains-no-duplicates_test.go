package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestNavbar_contains_no_duplicates(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare namespace Windows {
    export namespace Foundation {
        export var A;
        export class Test {
            public wow();
        }
    }
}

declare namespace Windows {
    export namespace Foundation {
        export var B;
        export namespace Test {
            export function Boom(): number;
        }
    }
}

class ABC {
    public foo() {
        return 3;
    }
}

namespace ABC {
    export var x = 3;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineDocumentSymbol(t)
}
