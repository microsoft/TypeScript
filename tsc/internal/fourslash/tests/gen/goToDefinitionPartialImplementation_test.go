package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionPartialImplementation(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: goToDefinitionPartialImplementation_1.ts
module A {
    export interface /*Part1Definition*/IA {
        y: string;
    }
}
// @Filename: goToDefinitionPartialImplementation_2.ts
module A {
    export interface /*Part2Definition*/IA {
        x: number;
    }

    var x: [|/*Part2Use*/IA|];
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "Part2Use")
}
