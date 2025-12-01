package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyFunctionAmbiguity5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: a.d.ts
declare function foo(x?: number): void;
// @filename: b.d.ts
declare function foo(x?: string): void;
declare function foo(x?: boolean): void;
// @filename: main.ts
function /**/bar() {
    foo();
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyBaselineCallHierarchy(t)
}
