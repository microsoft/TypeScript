package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCallHierarchyExportDefaultClass(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @filename: main.ts
import Bar from "./other";

function foo() {
    new Bar();
}
// @filename: other.ts
export /**/default class {
    constructor() {
        baz();
    }
}

function baz() {
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyBaselineCallHierarchy(t)
}
