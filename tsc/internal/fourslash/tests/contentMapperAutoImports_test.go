package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperAutoImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<script lang="ts">
export const profileTitle = "Profile";
</script>

// @Filename: /main.ts
profileTi/**/
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"profileTitle"},
		},
	})
	f.BaselineAutoImportsCompletions(t, []string{""})
}

func TestContentMapperAnonymousDefaultAutoImportName(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /Component.vue
<script lang="ts">
export default {};
</script>

// @Filename: /main.ts
Comp/**/
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"Component"},
			Excludes: []string{"ComponentVue"},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "Component",
		Source:      "./Component.vue",
		Description: "Add import from \"./Component.vue\"",
		NewFileContent: new(`import Component from "./Component.vue";

Comp
`),
	})
}

func TestContentMapperAutoImportsIntoMappedFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /dep.ts
export const existing = 1;
export const helper = 2;

// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<script lang="ts">
import { existing } from "./dep";
export const profileTitle = help/**/;
</script>
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"helper"},
		},
	})
	f.BaselineAutoImportsCompletions(t, []string{""})
}

func TestContentMapperAutoImportsAfterSynthesizedHeader(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /dep.ts
export const helper = 1;

// @Filename: /app.box
const value = help/**/;
`, contentmappertest.TransformingMapper, ".box")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{"helper"}},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "helper",
		Source:      "./dep",
		Description: "Add import from \"./dep\"",
		NewFileContent: new(`import { helper } from "./dep";

const value = help;
`),
	})
}

func TestContentMapperSupplementalAutoImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /dep.ts
export const helper = 1;

// @Filename: /app.astro
const value = help/**/;
`, contentmappertest.SupplementalMapper, ".astro")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{
			&lsproto.CompletionItem{
				Label:               "helper",
				SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				Data:                &lsproto.CompletionItemData{AutoImport: &lsproto.AutoImportFix{ModuleSpecifier: "./dep"}},
				AdditionalTextEdits: fourslash.AnyTextEdits,
			},
		}},
	})
}

func TestContentMapperSupplementalFilesAreNotAutoImportTargets(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /lib.astro
export const supplementalOnly = 1;

// @Filename: /main.ts
supplementalOn/**/
`, contentmappertest.SupplementalMapper, ".astro")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{Excludes: []string{"supplementalOnly"}},
	})
}

func TestContentMapperNodeModulesAutoImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /package.json
{ "dependencies": { "profile-package": "1.0.0" } }

// @Filename: /node_modules/profile-package/package.json
{ "name": "profile-package", "version": "1.0.0" }

// @Filename: /node_modules/profile-package/ProfileCard.vue
<component name="ProfileCard">
<script lang="ts">
export const profileTitle = "Profile";
</script>

// @Filename: /node_modules/profile-package/HiddenCard.vue
<component name="HiddenCard">
<script lang="ts">
export const hiddenTitle = "Hidden";
</script>

// @Filename: /load.ts
import "profile-package/ProfileCard.vue";

// @Filename: /main.ts
profileTi/**/
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		UserPreferences: &lsutil.UserPreferences{
			IncludeCompletionsForModuleExports:    core.TSTrue,
			IncludeCompletionsForImportStatements: core.TSTrue,
		},
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"profileTitle"},
			Excludes: []string{"hiddenTitle"},
		},
	})
	f.BaselineAutoImportsCompletions(t, []string{""})
}
