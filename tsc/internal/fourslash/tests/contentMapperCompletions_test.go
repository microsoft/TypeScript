package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperCompletions(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /settings.ts
export const settings = { color: "blue", size: 2 };

// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template>
  <h1>{{ ti/*atom*/tle }}</h1>
  <div class="card/*markup*/">Profile</div>
</template>
<script lang="ts">
import { settings } from "./settings";
export const title = "Profile";
export const card = { title, settings };
settings.co/*outgoing*/lor;
card.ti/*exact*/tle;
</script>

// @Filename: /main.ts
import { card } from "./ProfileCard.vue";
card.se/*incoming*/ttings;
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	propertyCompletions := func(items ...fourslash.CompletionsExpectedItem) *fourslash.CompletionsExpectedList {
		return &fourslash.CompletionsExpectedList{
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{CommitCharacters: &DefaultCommitCharacters, EditRange: Ignored},
			Items:        &fourslash.CompletionsExpectedItems{Includes: items},
		}
	}
	f.VerifyCompletions(t, "exact", propertyCompletions("title"))
	f.VerifyCompletions(t, "outgoing", propertyCompletions("color"))
	f.VerifyCompletions(t, "incoming", propertyCompletions("settings"))
	f.VerifyCompletions(t, "atom", nil)
	f.VerifyCompletions(t, "markup", nil)
}

func TestContentMapperCompletionAtMappedBoundary(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /settings.ts
export const settings = { color: "blue", size: 2 };

// @Filename: /ProfileCard.vue
<script lang="ts">
import { settings } from "./settings";
settings./*boundary*/</script>
<template>{{ settings }}</template>
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyCompletions(t, "boundary", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{CommitCharacters: &DefaultCommitCharacters, EditRange: Ignored},
		Items:        &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{"color", "size"}},
	})
}

func TestContentMapperCompletionEditRange(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /app.box
export const foo = 1;
[|foo|]/*completion*/
`, contentmappertest.TransformingMapper, ".box")
	defer done()

	f.VerifyCompletions(t, "completion", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange: &fourslash.EditRange{
				Insert:  f.Ranges()[0],
				Replace: f.Ranges()[0],
			},
		},
		Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{"foo"}},
	})
}

func TestContentMapperModulePathCompletions(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `// @Filename: /tsconfig.json
{
	"compilerOptions": {
		"target": "es2020",
		"module": "esnext",
		"moduleResolution": "bundler",
		"strict": true
	},
	"contentMappers": [
		{ "package": "mapper", "extensions": [".vue"] }
	],
	"files": ["main.ts", "Loaded.vue"]
}

// @Filename: /node_modules/mapper/package.json
` + contentmappertest.PackageJSON(contentmappertest.ComponentMapper) + `

// @Filename: /Loaded.vue
<component name="Loaded">
<script lang="ts">
export const loaded = true;
</script>

// @Filename: /Unloaded.vue
// @noOpen: true
<component name="Unloaded">
<script lang="ts">
export const unloaded = true;
</script>

// @Filename: /main.ts
import { loaded } from "./Loaded.vue";
import {} from "./[|/*loadedPath*/Lo|]";
import {} from "./[|/*unloadedPath*/Un|]";
`
	f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
		ContentMapperSpawner: contentmappertest.NewSpawner(),
		RunExternalCode:      true,
	})
	defer done()

	pathCompletion := func(label string, rangeIndex int) *fourslash.CompletionsExpectedList {
		return &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &[]string{},
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: []fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:  label,
						Detail: new(label),
						Kind:   new(lsproto.CompletionItemKindFile),
						TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
							TextEdit: &lsproto.TextEdit{
								NewText: label,
								Range:   f.Ranges()[rangeIndex].LSRange,
							},
						},
					},
				},
			},
		}
	}
	f.VerifyCompletions(t, "loadedPath", pathCompletion("Loaded.vue", 0))
	f.VerifyCompletions(t, "unloadedPath", pathCompletion("Unloaded.vue", 1))
}
