package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionTypeReferenceDirective(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @typeRoots: src/types
// @Filename: src/types/lib/index.d.ts
/*0*/declare let $: {x: number};
// @Filename: src/app.ts
 /// <reference types="[|lib/*1*/|]"/>
 $.x;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1")
}
