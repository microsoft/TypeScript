package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "1")
}

func TestGoToDefinitionLibReferenceDirective(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /src/app.ts
/// <reference lib="/*start*/es/*middle*/2025/*end*/" />`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "start", "middle", "end")
}
