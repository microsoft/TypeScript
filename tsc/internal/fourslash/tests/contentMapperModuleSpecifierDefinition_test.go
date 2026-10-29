package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperModuleSpecifierDefinition(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	content := `// @Filename: /tsconfig.json
{
	"compilerOptions": {
		"module": "preserve",
		"moduleResolution": "bundler",
		"strict": true,
		"paths": { "@/*": ["./*"] }
	},
	"contentMappers": [
		{ "package": "component", "extensions": [".vue"] },
		{ "package": "verbatim", "extensions": [".foo"] }
	]
}

// @Filename: /node_modules/component/package.json
` + contentmappertest.PackageJSON(contentmappertest.ComponentMapper) + `

// @Filename: /node_modules/verbatim/package.json
` + contentmappertest.PackageJSON(contentmappertest.VerbatimMapper) + `

// @Filename: /Card.vue
<component name="Card">
<template>
  <h1>{{ title }}</h1>
</template>
<script lang="ts">
export const title = "Card";
</script>

// @Filename: /plain.foo
export const plain = 1;

// @Filename: /main.ts
import { title } from "/*relativeImport*/./Card.vue";
import { title as aliasedTitle } from "/*aliasImport*/@/Card.vue";
import { plain } from "/*verbatimAliasImport*/@/plain.foo";
export { title as reexportedTitle } from "/*reexport*/./Card.vue";
export { plain as reexportedPlain } from "/*verbatimReexport*/./plain.foo";
export { title, aliasedTitle, plain };
`
	f, done := fourslash.NewFourslashWithOptions(t, content, &fourslash.FourslashOptions{
		ContentMapperSpawner: contentmappertest.NewSpawner(),
		RunExternalCode:      true,
	})
	defer done()

	f.VerifyBaselineGoToDefinition(t, false, /*includeOriginalSelectionRange*/
		"relativeImport",
		"aliasImport",
		"verbatimAliasImport",
		"reexport",
		"verbatimReexport",
	)
}
