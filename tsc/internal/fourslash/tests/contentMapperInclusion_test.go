package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperInclusionCompletions(t *testing.T) {
	t.Parallel()
	for _, ambient := range []bool{false, true} {
		t.Run(core.IfElse(ambient, "ambient fallback", "mapper only"), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			// The verbatim mapper exposes TypeScript unchanged with identity span mappings.
			content := `// @Filename: /tsconfig.json
{
	"compilerOptions": {"module": "preserve"},
	"contentMappers": [{"package": "mapper", "extensions": [".toml"], "include": ["blob.toml"]}]
}
// @Filename: /node_modules/mapper/package.json
` + contentmappertest.PackageJSON(contentmappertest.VerbatimMapper) + `
// @Filename: /blob.toml
// @noOpen: true
export const value = 1;
// @Filename: /other.toml
// @noOpen: true
not TypeScript
// @Filename: /main.ts
import {} from "./[|/*path*/|]";
`
			if ambient {
				// Unclaimed files can still be imported through a wildcard ambient module.
				content += `// @Filename: /ambient.d.ts
declare module "*.toml" {}
`
			}
			f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
				ContentMapperSpawner: contentmappertest.NewSpawner(), RunExternalCode: true,
			})
			defer done()
			f.VerifyCompletions(t, "path", &fourslash.CompletionsExpectedList{
				ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
					CommitCharacters: &[]string{}, EditRange: Ignored,
				},
				Items: &fourslash.CompletionsExpectedItems{
					Includes: append([]fourslash.CompletionsExpectedItem{"blob.toml"}, core.IfElse(ambient, []fourslash.CompletionsExpectedItem{"other.toml"}, nil)...),
					Excludes: core.IfElse(ambient, nil, []string{"other.toml"}),
				},
			})
		})
	}
}
