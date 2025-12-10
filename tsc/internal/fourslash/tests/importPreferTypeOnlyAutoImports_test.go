package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPreferTypeOnlyAutoImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: types.ts
export type MyType = { x: number };
export const MyValue = 123;
// @Filename: main.ts
let x: MyT/*type*/;
let y = MyV/*value*/;
`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.Configure(t, &lsutil.UserPreferences{
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
		PreferTypeOnlyAutoImports:             core.TSTrue,
	})

	// Baseline auto-import completions at both markers
	f.BaselineAutoImportsCompletions(t, []string{"type", "value"})
}
