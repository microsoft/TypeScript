package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionPartialImplementation(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: goToDefinitionPartialImplementation_1.ts
namespace A {
    export interface /*Part1Definition*/IA {
        y: string;
    }
}
// @Filename: goToDefinitionPartialImplementation_2.ts
namespace A {
    export interface /*Part2Definition*/IA {
        x: number;
    }

    var x: [|/*Part2Use*/IA|];
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToDefinition(t, true, "Part2Use")
}
