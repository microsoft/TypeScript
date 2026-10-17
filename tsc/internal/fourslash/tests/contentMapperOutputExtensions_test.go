package fourslash_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperOutputExtensionsAutoImportsUseSource(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The verbatim mapper exposes the original TypeScript with identity span mappings.
	content := `// @Filename: /tsconfig.json
{
	"compilerOptions": {
		"module": "preserve", "rewriteRelativeImportExtensions": true
	},
	"contentMappers": [{
		"package": "mapper", "extensions": [".vue"],
		"outputExtensions": {".vue": ".js"}
	}]
}
// @Filename: /node_modules/mapper/package.json
` + contentmappertest.PackageJSON(contentmappertest.VerbatimMapper) + `
// @Filename: /Component.vue
export const component = 1;
// @Filename: /main.ts
compon/**/
`
	f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
		ContentMapperSpawner: contentmappertest.NewSpawner(), RunExternalCode: true,
	})
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters, EditRange: Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{"component"}},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name: "component", Source: "./Component.vue",
		Description: "Add import from \"./Component.vue\"",
		NewFileContent: new(`import { component } from "./Component.vue";

compon
`),
	})
}

func TestContentMapperOutputExtensionsProjectReferences(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name   string
		outDir string
	}{
		{"contentMapperOutputExtensionsProjectReferencesAligned", "/dist/app"},
		{"contentMapperOutputExtensionsProjectReferencesMisaligned", "/app/dist"},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			// Both mapped files expose their TypeScript unchanged with identity span mappings.
			content := `// @Filename: /node_modules/mapper/package.json
` + contentmappertest.PackageJSON(contentmappertest.VerbatimMapper) + `
// @Filename: /lib/tsconfig.json
{
	"compilerOptions": {
		"composite": true, "module": "preserve", "rootDir": ".", "outDir": "/dist/lib",
		"rewriteRelativeImportExtensions": true
	},
	"contentMappers": [{
		"package": "mapper", "extensions": [".vue"], "outputExtensions": {".vue": ".js"}
	}]
}
// @Filename: /lib/Component.vue
export const component = 1;
// @Filename: /app/tsconfig.json
{
	"compilerOptions": {
		"composite": true, "module": "preserve", "rootDir": ".", "outDir": "$outDir",
		"rewriteRelativeImportExtensions": true
	},
	"references": [{"path": "../lib"}],
	"contentMappers": [{
		"package": "mapper", "extensions": [".vue"], "outputExtensions": {".vue": ".js"}
	}]
}
// @Filename: /app/main.ts
import { component } from "../lib/Component.vue";
export const value = component;
`
			content = strings.ReplaceAll(content, "$outDir", test.outDir)
			f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
				ContentMapperSpawner: contentmappertest.NewSpawner(), RunExternalCode: true,
			})
			defer done()
			f.VerifyBaselineNonSuggestionDiagnostics(t)
		})
	}
}
